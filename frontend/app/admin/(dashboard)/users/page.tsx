import UsersTable from "./components/UsersTable";

export const metadata = {
  title: "Pengguna — Dashboard Admin",
};

export default function AdminUsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <UsersTable />
    </div>
  );
}