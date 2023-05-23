import navData from "../data/navData";
import React, { useContext } from 'react';
import { LayoutGroup, motion } from "framer-motion";
import Button from "../components/ui/Button";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import {AuthContext} from '../context/auth';


export default function Nav() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    return (
        <nav className="mt-10 grid gap-6">
            <LayoutGroup>
                <ul className="grid gap-8 pt-16">
                    {Object.entries(navData).map(([path, { name, icon }]) => {
                        const isActive = path === location.pathname;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={clsx(
                                    "transition-all hover:text-neutral-200 flex align-middle",
                                    {
                                        "text-neutral-200": isActive,
                                        "font-bold": isActive,
                                    }
                                )}
                            >
                                <span className="relative py-[5px] px-[10px] capitalize">
                                    <span className="flex items-center gap-2">
                                        <span className="text-2xl">{icon}</span>
                                        <span className="text-xl">{name}</span>
                                    </span>
                                    {path === location.pathname ? (
                                        <motion.div
                                            className="absolute inset-0 bg-neutral-800 rounded-md z-[-1]"
                                            layoutId="sidebar"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    ) : null}
                                </span>
                            </Link>
                        );
                    })}
                </ul>
            </LayoutGroup>
            <Button onClick={logout}
                size={"sm"}
                className="mt-6 bg-neutral-200 hover:bg-neutral-300 text-neutral-500 hover:text-neutral-700 pr-6"
            >
                <MdLogout className="mx-1 mr-2 text-xl" />
                Logout
            </Button>
        </nav>
    );
}