import React, { useState, useEffect } from "react";
import SalesChart from "../../components/SalesCharts";
import PopularFoodChart from "../../components/PopularFoodChart";
import StatsCard from "../../components/StatsCard";
import SearchBar from "../../components/Searchbar";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../Store/authSlice";
import { account, databases } from "../../appwrite/profile";
import Configure from "../../Conf/configure";
import Sidebar from "../../components/SideBar/SideBar";
import "./dashboard.css";
import "../../index.css";
import Logo from "../../components/Logo";

export default function Dashboard() {
  const dispatch = useDispatch();
  const reduxAuthStatus = useSelector((state) => state.auth.status);
  const [authStatus, setAuthStatus] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await account.get();
        dispatch(login(user));
        setAuthStatus(true);
      } catch (err) {
        dispatch(logout());
        setAuthStatus(false);
      }
    };
    checkLogin();
  }, [dispatch]);

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 600 },
    { month: "Mar", sales: 750 },
    { month: "Apr", sales: 500 },
    { month: "May", sales: 450 },
    { month: "Jun", sales: 620 },
    { month: "Jul", sales: 480 },
    { month: "Aug", sales: 550 },
    { month: "Sep", sales: 430 },
    { month: "Oct", sales: 600 },
    { month: "Nov", sales: 520 },
    { month: "Dec", sales: 700 },
  ];

  const foodData = [
    { name: "Nougat Food", value: 400 },
    { name: "Fudge Food", value: 300 },
    { name: "Jeon Food", value: 300 },
  ];

  const [menuItems, setMenuItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await databases.listDocuments(
          Configure.appwriteDATABASEID,
          Configure.appwriteMENUITEM
        );
        const items = response.documents
          .map((doc) => doc.title)
          .filter((title) => typeof title === "string" && title.length > 0);

        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const filtered = menuItems.filter(
    (item) => item && item.toLowerCase().includes(query.toLowerCase())
  );

  const highlightMatch = (text) => {
    if (!text) return null;
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleSearchClick = () => {
    if (filtered.length > 0) {
      const itemToSearch = filtered[0];
      navigate(`/menu?search=${encodeURIComponent(itemToSearch)}`);
    } else {
      alert("Item not found!");
    }
  };

  return (
    <div className="dashboard-wrapper">
    
      {/* ✅ Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ✅ Top Bar */}
      <div className="top-bar">
      
        <div
          className="hamburger"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input">
            <SearchBar placeholder="Search items..." onChange={setQuery} />
          </div>
          <button onClick={handleSearchClick} className="search-btn">
            Search
          </button>
        </div>

        {/* Auth Buttons */}
        {authStatus === false && (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="search-results">
        {query ? (
          filtered.length > 0 ? (
            <ul>
              {filtered.map((item, index) => (
                <li key={index} className="search-item">
                  {highlightMatch(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="not-found">No items found</p>
          )
        ) : null}
      </div>

      {/* Dashboard Overview */}
      <div className="stats-grid">
        <StatsCard
          icon={<ShoppingCart className="icon-pink" size={32} />}
          title="Orders"
          value="1,248"
          chartData={[{ value: 200 }, { value: 400 }, { value: 350 }, { value: 500 }, { value: 600 }]}
        />
        <StatsCard
          icon={<Users className="icon-purple" size={32} />}
          title="Customers"
          value="9,445"
          chartData={[{ value: 5000 }, { value: 6500 }, { value: 7200 }, { value: 8000 }, { value: 9445 }]}
        />
        <StatsCard
          icon="📋"
          title="Menu"
          value={menuItems.length}
          chartData={[{ value: 100 }, { value: 200 }, { value: 300 }, { value: 450 }, { value: menuItems.length }]}
        />
        <StatsCard
          icon={<DollarSign className="icon-yellow" size={32} />}
          title="Income"
          value="$18,445"
          chartData={[{ value: 5000 }, { value: 8000 }, { value: 12000 }, { value: 15000 }, { value: 18445 }]}
        />
      </div>

      {/* Graphs */}
      <div className="charts-grid">
        <PopularFoodChart data={foodData} />
        <SalesChart data={salesData} />
      </div>

      {/* Extra Stats */}
      <div className="extra-stats">
        <StatsCard icon="🍔" title="Total Orders" value="1,234" />
        <StatsCard icon="💰" title="Total Revenue" value="$12,345" />
        <StatsCard icon="🛒" title="Active Users" value="567" />
        <StatsCard icon="⭐" title="Customer Satisfaction" value="95%" />
      </div>
    </div>
  );
}
