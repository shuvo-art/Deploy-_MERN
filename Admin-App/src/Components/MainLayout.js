import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineBgColors } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { FaBloggerB, FaGalacticSenate } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { ImBlog } from "react-icons/im";
import { RiCouponLine } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";

import { Button, Layout, Menu, theme, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";
import EditProfile from "./EditProfile"; // import the EditProfile component

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEditProfile = () => {
    setIsModalOpen(true); // Show modal when edit profile is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when done editing profile
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">Disaster</span>
            <span className="lg-logo">Disaster Management</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              handleSignOut();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "volunteers",
              icon: <FiUser className="fs-5" />,
              label: "Volunteers",
            },
            {
              key: "catalog",
              icon: <BsCart2 className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "donation",
                  icon: <BsCart2 className="fs-5" />,
                  label: "Add Donation",
                },
                {
                  key: "chart-donation",
                  icon: <BsCart2 className="fs-5" />,
                  label: "Donation Chart",
                },
                {
                  key: "crisis",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Add Crisis",
                },
                {
                  key: "list-crisis",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Crisis List",
                },
              ],
            },

            /* Private Routes for logged-in users */
            ...(user && (user.role === "volunteer" || user.role === "admin")
              ? [
                  {
                    key: "inventory",
                    icon: <RiCouponLine className="fs-5" />,
                    label: "Inventory",
                    children: [
                      {
                        key: "relief",
                        icon: <ImBlog className="fs-5" />,
                        label: "Add Relief",
                      },
                      {
                        key: "relief-list",
                        icon: <RiCouponLine className="fs-5" />,
                        label: "Relief List",
                      },
                      {
                        key: "add-expense",
                        icon: <AiOutlineBgColors className="fs-5" />,
                        label: "Add Expense",
                      },
                      {
                        key: "expenses",
                        icon: <AiOutlineBgColors className="fs-5" />,
                        label: "Expense List",
                      },
                    ],
                  },
                ]
              : []),

            /* Admin-only Routes */
            ...(user && user.role === "admin"
              ? [
                  {
                    key: "admin",
                    icon: <FaBloggerB className="fs-5" />,
                    label: "Admin",
                    children: [
                      {
                        key: "generate-report",
                        icon: <FaGalacticSenate className="fs-5" />,
                        label: "Generate Report",
                      },
                    ],
                  },
                ]
              : []),
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="d-flex gap-4 align-items-center">
            {!user ? (
              <div className="d-flex gap-3">
                {/* Show Login and Signup when the user is not verified */}
                <Button type="primary" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button type="default" onClick={() => navigate("/register")}>
                  Signup
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img
                    width={32}
                    height={32}
                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                    alt=""
                  />
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">{user.name}</h5>
                  <p className="mb-0">{user.email}</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <div
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      role="button"
                      onClick={handleEditProfile} // Show Edit Profile Modal
                    >
                      Edit Profile
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      role="button"
                      onClick={handleSignOut} // Handle Signout
                    >
                      Signout
                    </div>
                  </li>
                </div>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnVisibilityChange
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>

      {/* Modal for Edit Profile */}
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {user ? <EditProfile userId={user._id} /> : null}
      </Modal>
    </Layout>
  );
};

export default MainLayout;
