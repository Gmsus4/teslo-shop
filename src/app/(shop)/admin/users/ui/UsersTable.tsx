"use client";

import { ChangeUserRole } from "@/actions";
import { ProductImage } from "@/components";
import { Role } from "@prisma/client";
import clsx from "clsx";
import { RiVipCrown2Fill } from "react-icons/ri";

interface Props {
  users: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string;
    role: Role;
    image: string | null;
}[]
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  {
                    user.role === 'admin' && (
                      <div className="absolute top-[-5px] right-[-5px]">
                        <RiVipCrown2Fill size={20} className="text-yellow-400"/>
                        {/* <FaStar size={20} className="text-yellow-400"/> */}
                      </div>
                    )
                  }
                  <ProductImage 
                    className="rounded-full object-fill w-12 h-12"
                    alt={user.name!}
                    src={user.image!}
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className={
                    clsx(
                      "text-sm font-medium text-gray-900 truncate",
                      {
                        'bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold': user.role === 'admin'
                      }
                    )
                  }>
                    { user.name }
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  <select
                    className="text-sm text-gray-900 w-full py-2 px-4 cursor-pointer border-none bg-slate-100 rounded-lg"
                    value={user.role}
                    onChange={(e) =>
                      ChangeUserRole(
                        user.id,
                        e.target.value as "admin" | "user"
                      )
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </li>
            // <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            //   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            //     {user.email}
            //   </td>
            //   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            //     { user.name }
            //   </td>
            //   <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            //     <select
            //         className="text-sm text-gray-900 w-full p-2 cursor-pointer"
            //         value={user.role}
            //         onChange={e => ChangeUserRole(user.id, e.target.value as 'admin' | 'user') }>
            //         <option value="admin">Admin</option>
            //         <option value="user">User</option>
            //       </select>
            //   </td>
            // </tr>
          ))}
        </ul>
      </div>
    </div>
  );
};
