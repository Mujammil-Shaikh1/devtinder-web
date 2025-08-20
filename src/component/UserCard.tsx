import type { Feed } from "../model/store";

interface UserCardProps {
  user: Feed;
  hideButton?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, hideButton }) => {
  const { fullName, userName, profilePic, phone, age, gender } = user;
  return (
    <div className="card bg-base-300 w-72 shadow-sm">
      <figure>
        <img src={profilePic} alt="profile.jpeg" className="h-[200px] w-full " />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p> @{userName}</p>
        {phone && <p>{phone}</p>}
        {age && gender && <p>{gender + "," + age}</p>}
        {!hideButton && (
          <div className="card-actions justify-start my-3">
            <button className="btn">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
