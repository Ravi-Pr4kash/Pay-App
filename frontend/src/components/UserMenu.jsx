import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ExitIcon, HamburgerMenuIcon, Pencil2Icon } from "@radix-ui/react-icons";



export default function UserMenu({ onLogout, onEdit }) {

	return (
        <>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer">
					<div className="flex flex-col justify-center h-full text-xl">
                    <HamburgerMenuIcon className="w-6 h-6" />
					</div>
				</div>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="bg-white shadow-md rounded-md p-2 w-40"
					sideOffset={5}
				>
					<DropdownMenu.Item
						className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer flex items-center gap-2"
						onClick={onEdit}
					>
						<Pencil2Icon /> Edit Info
                    
					</DropdownMenu.Item>

					<DropdownMenu.Separator className="h-px bg-slate-200 my-1" />

					<DropdownMenu.Item
						className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer flex items-center gap-2"
						onClick={onLogout}
					>
						<ExitIcon /> Logout
					</DropdownMenu.Item>

					<DropdownMenu.Arrow className="fill-white" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
       
        </>
	);
}