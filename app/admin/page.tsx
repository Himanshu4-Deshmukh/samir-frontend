// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { User as UserType } from "@/types";
// import { getAllUsers, updateUserPoints } from "@/lib/api";
// import {
//   AlertCircle,
//   User,
//   Users,
//   Check,
//   X,
//   Award,
//   Search,
// } from "lucide-react";

// export default function AdminPage() {
//   const { user: currentUser, token } = useAuth();
//   const [users, setUsers] = useState<UserType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [updateStatus, setUpdateStatus] = useState<{
//     userId: string;
//     status: "loading" | "success" | "error";
//   } | null>(null);

//   useEffect(() => {
//     const loadUsers = async () => {
//       if (!token) return;

//       try {
//         setIsLoading(true);
//         setError(null);
//         const usersData = await getAllUsers(token);
//         setUsers(usersData);
//       } catch (err) {
//         console.error("Failed to load users:", err);
//         setError("Failed to load users. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadUsers();
//   }, [token]);

//   const handleUpdatePoints = async (userId: string) => {
//     if (!token) return;

//     try {
//       setUpdateStatus({ userId, status: "loading" });
//       const result = await updateUserPoints(token, userId);

//       // Update the local state with the new user data
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId
//             ? { ...user, points: result.user.points, count: result.user.count }
//             : user
//         )
//       );

//       setUpdateStatus({ userId, status: "success" });

//       // Reset the status after a delay
//       setTimeout(() => {
//         setUpdateStatus(null);
//       }, 2000);
//     } catch (err) {
//       console.error("Failed to update user points:", err);
//       setUpdateStatus({ userId, status: "error" });

//       // Reset the status after a delay
//       setTimeout(() => {
//         setUpdateStatus(null);
//       }, 2000);
//     }
//   };

//   const filteredUsers =
//     searchQuery.trim() === ""
//       ? users
//       : users.filter(
//           (user) =>
//             user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//   return (
//     <ProtectedRoute adminOnly>
//       <div className="container mx-auto px-4 pt-24 pb-12">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold neon-text">Admin Dashboard</h1>
//             <p className="text-gray-400 mt-2">Manage users and activities</p>
//           </div>

//           <div className="mt-4 md:mt-0 w-full md:w-auto">
//             <div className="relative max-w-md w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="block w-full pl-10 py-2 bg-black/50 border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
//               />
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 flex items-center">
//             <AlertCircle className="mr-2 h-5 w-5" />
//             <p>{error}</p>
//           </div>
//         )}

//         <div className="punk-card overflow-hidden">
//           {isLoading ? (
//             <div className="p-8 text-center">
//               <div className="animate-pulse neon-text text-xl">
//                 Loading users...
//               </div>
//             </div>
//           ) : filteredUsers.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-black/60 text-gray-300">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       Points
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       Activities
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-800">
//                   {filteredUsers.map((user) => (
//                     <tr key={user._id} className="hover:bg-black/30">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
//                             <User className="h-4 w-4 text-primary" />
//                           </div>
//                           <div className="text-sm font-medium">
//                             {user.username}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                         {user.email}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
//                           {user.points} points
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                         {user.count}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 text-xs font-semibold rounded-full
//                           ${
//                             user.isAdmin
//                               ? "bg-accent/10 text-accent"
//                               : "bg-secondary/10 text-secondary"
//                           }`}
//                         >
//                           {user.isAdmin ? "Admin" : "User"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                         <button
//                           onClick={() => handleUpdatePoints(user._id)}
//                           disabled={updateStatus?.userId === user._id}
//                           className={`punk-button py-1 px-3 text-sm flex items-center space-x-1 ${
//                             updateStatus?.userId === user._id
//                               ? "opacity-70"
//                               : ""
//                           }`}
//                         >
//                           {updateStatus?.userId === user._id ? (
//                             updateStatus.status === "loading" ? (
//                               <span className="flex items-center space-x-1">
//                                 <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
//                                 <span>Updating</span>
//                               </span>
//                             ) : updateStatus.status === "success" ? (
//                               <span className="flex items-center space-x-1">
//                                 <Check className="h-4 w-4 text-green-500" />
//                                 <span>Updated</span>
//                               </span>
//                             ) : (
//                               <span className="flex items-center space-x-1">
//                                 <X className="h-4 w-4 text-red-500" />
//                                 <span>Failed</span>
//                               </span>
//                             )
//                           ) : (
//                             <span className="flex items-center space-x-1">
//                               <Award className="h-4 w-4" />
//                               <span>Add Points</span>
//                             </span>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="p-8 text-center">
//               <Users className="mx-auto h-12 w-12 text-gray-500 mb-4" />
//               <h3 className="text-xl font-bold mb-2">No users found</h3>
//               <p className="text-gray-400">
//                 No users match your search criteria.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 punk-card p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <h2 className="text-xl font-semibold">Admin Actions</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-black/40 p-4 rounded-lg">
//               <h3 className="font-medium mb-2">User Management</h3>
//               <p className="text-sm text-gray-400 mb-4">
//                 Use the table above to add points to users for completing
//                 activities.
//               </p>
//               <p className="text-xs text-gray-500">
//                 Each time you click "Add Points", the user gains 10 points and 1
//                 activity count.
//               </p>
//             </div>

//             <div className="bg-black/40 p-4 rounded-lg">
//               <h3 className="font-medium mb-2">Admin Statistics</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-sm text-gray-400">Total Users:</span>
//                   <span className="text-sm font-medium">{users.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-gray-400">Admin Users:</span>
//                   <span className="text-sm font-medium">
//                     {users.filter((u) => u.isAdmin).length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-gray-400">Regular Users:</span>
//                   <span className="text-sm font-medium">
//                     {users.filter((u) => !u.isAdmin).length}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User as UserType } from "@/types";
import { getAllUsers, updateUserPoints } from "@/lib/api";
import {
  AlertCircle,
  User,
  Users,
  Check,
  X,
  Award,
  Search,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

export default function AdminPage() {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateStatus, setUpdateStatus] = useState<{
    userId: string;
    status: "loading" | "success" | "error";
  } | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        setError(null);
        const usersData = await getAllUsers(token);
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const handleUpdatePoints = async (userId: string, type: "add" | "deduct") => {
    if (!token) return;

    try {
      setUpdateStatus({ userId, status: "loading" });
      const result = await updateUserPoints(token, userId, type);

      // Update the local state with the new user data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, points: result.user.points, count: result.user.count }
            : user
        )
      );

      setUpdateStatus({ userId, status: "success" });

      // Reset the status after a delay
      setTimeout(() => {
        setUpdateStatus(null);
      }, 2000);
    } catch (err) {
      console.error(`Failed to ${type} user points:`, err);
      setUpdateStatus({ userId, status: "error" });

      // Reset the status after a delay
      setTimeout(() => {
        setUpdateStatus(null);
      }, 2000);
    }
  };

  const filteredUsers =
    searchQuery.trim() === ""
      ? users
      : users.filter(
          (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold neon-text">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage users and activities</p>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 py-2 bg-black/50 border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="punk-card overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-pulse neon-text text-xl">
                Loading users...
              </div>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/60 text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Activities
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-black/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="text-sm font-medium">
                            {user.username}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                          {user.points} points
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full 
                          ${
                            user.isAdmin
                              ? "bg-accent/10 text-accent"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex space-x-2">
                          {/* Add Points Button */}
                          <button
                            onClick={() => handleUpdatePoints(user._id, "add")}
                            disabled={updateStatus?.userId === user._id}
                            className={`punk-button py-1 px-3 text-sm flex items-center space-x-1 ${
                              updateStatus?.userId === user._id
                                ? "opacity-70"
                                : ""
                            }`}
                          >
                            {updateStatus?.userId === user._id ? (
                              updateStatus.status === "loading" ? (
                                <span className="flex items-center space-x-1">
                                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                                  <span>Updating</span>
                                </span>
                              ) : updateStatus.status === "success" ? (
                                <span className="flex items-center space-x-1">
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span>Updated</span>
                                </span>
                              ) : (
                                <span className="flex items-center space-x-1">
                                  <X className="h-4 w-4 text-red-500" />
                                  <span>Failed</span>
                                </span>
                              )
                            ) : (
                              <span className="flex items-center space-x-1">
                                <PlusCircle className="h-4 w-4" />
                                <span>Add</span>
                              </span>
                            )}
                          </button>

                          {/* Deduct Points Button */}
                          <button
                            onClick={() =>
                              handleUpdatePoints(user._id, "deduct")
                            }
                            disabled={
                              updateStatus?.userId === user._id ||
                              user.points === 0
                            }
                            className={`punk-button py-1 px-3 text-sm flex items-center space-x-1 bg-red-900/50 hover:bg-red-800/50 ${
                              updateStatus?.userId === user._id ||
                              user.points === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <span className="flex items-center space-x-1">
                              <MinusCircle className="h-4 w-4" />
                              <span>Deduct</span>
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">No users found</h3>
              <p className="text-gray-400">
                No users match your search criteria.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 punk-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h2 className="text-xl font-semibold">Admin Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-lg">
              <h3 className="font-medium mb-2">User Management</h3>
              <p className="text-sm text-gray-400 mb-4">
                Use the table above to manage user points and activities.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Add: +10 points, +1 activity count</li>
                <li>• Deduct: -10 points, -1 activity count</li>
              </ul>
            </div>

            <div className="bg-black/40 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Admin Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Total Users:</span>
                  <span className="text-sm font-medium">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Admin Users:</span>
                  <span className="text-sm font-medium">
                    {users.filter((u) => u.isAdmin).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Regular Users:</span>
                  <span className="text-sm font-medium">
                    {users.filter((u) => !u.isAdmin).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
