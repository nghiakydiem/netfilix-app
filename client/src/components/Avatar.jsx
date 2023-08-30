import "../css/Avatar.css";
import { useNavigate } from "react-router-dom";

export default function Avatar({ email }) {
  const navigate = useNavigate();
  const avatarChar = email?.charAt(0).toUpperCase();

  return (
    <div onClick={() => navigate("/profile")} className="avatar" alt="Avatar">
      {avatarChar}
    </div>
  );
}
