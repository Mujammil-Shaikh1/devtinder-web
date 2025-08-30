import type { Feed } from "../model/store";

interface UserCardProps {
  user: Feed;
  hideButton?: boolean;
  handleUser?: (status: string, id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  hideButton,
  handleUser,
}) => {
  const { _id, fullName, userName, profilePic, phone, age, gender } = user;
  return (
    <div className="card bg-base-300 w-72 shadow-sm">
      <figure>
        <img
          src={profilePic}
          alt="profile.jpeg"
          className="h-[200px] w-full "
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p> @{userName}</p>
        {phone && <p>{phone}</p>}
        {age && gender && <p>{gender + "," + age}</p>}
        {!hideButton && handleUser && (
          <div className="card-actions justify-start my-3">
            <button className="btn" onClick={() => handleUser("ignored", _id)}>
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleUser("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
