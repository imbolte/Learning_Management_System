"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
    HomeOutlined,
    ArrowForwardIos,
    ArrowBackIos,
    PeopleOutlined,
    BarChartOutlined,
    MapOutlined,
    OndemandVideo,
    VideoCallOutlined,
    ManageHistoryOutlined,
    ExitToApp,
} from "@mui/icons-material";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useTheme as useNextTheme } from "next-themes";

interface ItemProps {
    title: string;
    to: string;
    icon: any;
    selected: string;
    setSelected: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
    const router = useRouter();

    const handleClick = () => {
        setSelected(title);
        router.push(to);
    };

    return (
        <MenuItem
            active={selected === title}
            onClick={handleClick}
            icon={icon}
        >
            <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
        </MenuItem>
    );
};

const AdminSidebar = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useNextTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const logoutHandler = () => {
        setTheme("system");
    };

    return (
        <Box
            sx={{
                "& .ps-sidebar-root": {
                    background: `${theme === "dark"
                            ? "linear-gradient(to bottom, rgb(17, 24, 39), rgb(0, 0, 0)) !important"
                            : "#ffffff !important"
                        }`,
                    borderRight: `1px solid ${theme === "dark" ? "#2d3748" : "#e2e8f0"}`,
                },
                "& .ps-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .ps-menu-button:hover": {
                    backgroundColor: `${theme === "dark" ? "rgba(31, 41, 55, 0.6) !important" : "#e2e8f0 !important"
                        }`,
                    color: `${theme === "dark" ? "#60a5fa !important" : "#1e40af !important"}`,
                    borderRadius: "8px !important",
                    transition: "all 0.3s ease !important",
                },
                "& .ps-menu-button.ps-active": {
                    backgroundColor: `${theme === "dark" ? "rgba(30, 64, 175, 0.6) !important" : "#dbeafe !important"
                        }`,
                    color: `${theme === "dark" ? "#60a5fa !important" : "#1e40af !important"}`,
                    borderRadius: "8px !important",
                    borderLeft: `3px solid ${theme === "dark" ? "#3b82f6" : "#2563eb"}`,
                },
                "& .ps-menu-button": {
                    padding: "12px 20px !important",
                    margin: "4px 8px !important",
                    color: `${theme === "dark" ? "#e2e8f0" : "#1e293b"}`,
                    transition: "all 0.2s ease !important",
                },
                "& .ps-menu-label": {
                    color: `${theme === "dark" ? "#f1f5f9" : "#0f172a"}`,
                    fontWeight: "500 !important",
                },
            }}
            className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-900 dark:to-black bg-white dark:bg-transparent"
        >
            <Sidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    zIndex: 99999999999999,
                    width: isCollapsed ? "0%" : "16%",
                }}
            >
                <Menu>
                    <div
                        className="ps-menuitem-root ps-menu-button"
                        style={{
                            margin: "10px 0 20px 0",
                            cursor: "pointer",
                        }}
                    >
                        {isCollapsed ? (
                            <div onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center justify-center p-2">
                                <ArrowForwardIos className="!text-black dark:!text-[#ffffffc7]" />
                            </div>
                        ) : (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <h3
                                    className="text-[25px] font-Poppins uppercase !text-black dark:!text-white cursor-pointer !font-bold"
                                    onClick={() => window.location.href = "/"}
                                >
                                    ELearning
                                </h3>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-block">
                                    <ArrowBackIos className="!text-black dark:!text-[#ffffffc7]" />
                                </IconButton>
                            </Box>
                        )}
                    </div>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    alt="profile-user"
                                    width={100}
                                    height={100}
                                    src={user.avatar ? user.avatar.url : avatarDefault}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        border: "3px solid #5b6fe6",
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    className="!text-[20px] !text-black dark:!text-[#f1f5f9] !font-bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ m: "10px 0 0 0" }}
                                    className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] capitalize !font-[500]"
                                >
                                    - {user?.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/admin"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] uppercase !font-[600] tracking-wider"
                        >
                            {!isCollapsed && "Data"}
                        </Typography>
                        <Item
                            title="Users"
                            to="/admin/users"
                            icon={<PeopleOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] uppercase !font-[600] tracking-wider"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Content"}
                        </Typography>
                        <Item
                            title="Create Course"
                            to="/admin/create-course"
                            icon={<VideoCallOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Live Courses"
                            to="/admin/courses"
                            icon={<OndemandVideo />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] uppercase !font-[600] tracking-wider"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Analytics"}
                        </Typography>
                        <Item
                            title="Courses Analytics"
                            to="/admin/courses-analytics"
                            icon={<BarChartOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Orders Analytics"
                            to="/admin/orders-analytics"
                            icon={<MapOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Users Analytics"
                            to="/admin/users-analytics"
                            icon={<ManageHistoryOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] uppercase !font-[600] tracking-wider"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Extras"}
                        </Typography>
                        <div onClick={logoutHandler}>
                            <Item
                                title="Logout"
                                to="/"
                                icon={<ExitToApp />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </div>

                        <Typography
                            variant="h5"
                            className="!text-[16px] !text-[#64748b] dark:!text-[#94a3b8] uppercase !font-[600] tracking-wider"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Go Back"}
                        </Typography>
                        <Item
                            title="Back to Landing"
                            to="/"
                            icon={<ArrowBackIos />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default AdminSidebar;
