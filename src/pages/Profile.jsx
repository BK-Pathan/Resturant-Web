import React, { useState, useEffect } from "react";
import { databases, storage, account } from "../appwrite/profile";
import Configure from "../Conf/configure";
import { ID, Query, Permission, Role } from "appwrite";
import "./profile.css";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    ProfileImageId: "",
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const [userId, setUserId] = useState(null);
  const [tempImageId, setTempImageId] = useState(null); // Temporary image preview

  // ✅ Check if user is logged in and get userId
  const checkSession = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
      return user.$id;
    } catch (err) {
      console.error("User not logged in:", err);
      setSuccess("❌ Please log in to view/save profile");
      return null;
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ✅ Fetch existing profile from DB
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await databases.listDocuments(
          Configure.appwriteDATABASEID,
          Configure.appwritePROFILE,
          [Query.equal("userId", userId)]
        );

        if (res.documents.length > 0) {
          const data = res.documents[0];
          setProfile(data);
          setForm({
            name: data.name,
            phone: data.phone,
            address: data.address,
            ProfileImageId: data.ProfileImageId,
          });
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  // ✅ Build image URL 
  useEffect(() => {
    const id = tempImageId || form.ProfileImageId;
    if (id) {
      const url = `https://${Configure.appwriteurl.replace(
        "https://",
        ""
      )}/storage/buckets/${Configure.appwriteBUCKETID}/files/${id}/view?project=${Configure.appwritePROJECTID}`;
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  }, [tempImageId, form.ProfileImageId]);

  // ✅ Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploaded = await storage.createFile(
        Configure.appwriteBUCKETID,
        ID.unique(),
        file
      );
      setTempImageId(uploaded.$id); // temporary preview
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  // ✅ Save or update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUserId = userId || (await checkSession());
    if (!currentUserId) return;

    setLoading(true);

    try {
      const newProfileData = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        ProfileImageId: tempImageId || form.ProfileImageId,
        userId: currentUserId,
      };

      const permissions = [
        Permission.read(Role.user(currentUserId)),
        Permission.write(Role.user(currentUserId)), // write includes update
      ];

      if (profile) {
        // Update existing profile
        await databases.updateDocument(
          Configure.appwriteDATABASEID,
          Configure.appwritePROFILE,
          profile.$id,
          newProfileData,
          permissions
        );
      } else {
        // Create new profile
        await databases.createDocument(
          Configure.appwriteDATABASEID,
          Configure.appwritePROFILE,
          ID.unique(),
          newProfileData,
          permissions
        );
      }

      // ✅ Only after successful save update form & profile
      setForm(newProfileData);
      setProfile({ ...profile, ...newProfileData });
      setTempImageId(null); // clear temp image
      setSuccess("✅ Profile saved successfully!");
    } catch (err) {
      console.error("Profile save error:", err);
      setSuccess("❌ Failed to save profile. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="profile-page">
  <div className="profile-container">
    <h1 className="profile-title">My Profile</h1>

    {imageUrl && (
      <div className="profile-image-wrapper">
        <img
          src={imageUrl}
          alt="Profile"
          className="profile-image"
        />
      </div>
    )}

    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="profile-input"
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="profile-input"
      />

      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="profile-input"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="profile-file-input"
      />

      <button
        type="submit"
        disabled={loading}
        className="profile-save-btn"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>

    {success && (
      <p className="profile-success">{success}</p>
    )}
  </div>
  </div>
);
}