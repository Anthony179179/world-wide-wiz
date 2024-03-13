import {
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import ProfilesSearchBar from "./ProfilesSearchBar";
import { Person } from "@mui/icons-material";

const friends = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

function FriendsList() {
  const handleClick = (friendName: string) => {
    console.log(`Clicked on ${friendName}`);
  };

  return (
    <List sx={{ width: "300px" }}>
      <ListSubheader>Following</ListSubheader>
      <ProfilesSearchBar></ProfilesSearchBar>
      {friends.map((friend) => (
        <ListItemButton
          key={friend.id}
          onClick={() => handleClick(friend.name)}
        >
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={friend.name} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default FriendsList;
