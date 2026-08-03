import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} style={styles.button}>
          Logout
        </button>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>Users</h2>
          <p>Manage Users</p>
        </div>

        <div style={styles.card}>
          <h2>Cows</h2>
          <p>Manage Cattle Products</p>
        </div>

        <div style={styles.card}>
          <h2>Orders</h2>
          <p>Manage Orders</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  },

  button: {
    background: "#8B5E34",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    background: "#fff",
    width: "250px",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
};

export default AdminDashboard;