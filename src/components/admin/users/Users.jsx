import { UsersDataProvider } from "../../../contexts/UsersDataContext";
import UsersTable from "../DataTables/UsersTable";

const Users = () => {
  return (
    <UsersDataProvider>
      <UsersTable />
    </UsersDataProvider>
  );
};

export default Users;