import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomePage from "./page/home/Home";
import ProjectsPage from "./page/project/ProjectsPage";
import {Menu, MenuProps} from "antd";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons";

const items: MenuProps['items'] = [
    {
        label: (
            <NavLink to="/">Home</NavLink>
        ),
        key: 'home',
        icon: <HomeOutlined/>,
    },
    {
        label: (
            <NavLink to="/projects">Projects</NavLink>
        ), key: 'projects', icon: <ProjectOutlined/>
    },
];

function App() {
    const [currentSelect, setCurrentSelect] = useState('home')

    function handleMenuClick(e: any) {
        setCurrentSelect(e.key);
    }

    return (
        <BrowserRouter>
            <Menu items={items} mode="horizontal" selectedKeys={[currentSelect]} onClick={handleMenuClick}/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/projects" element={<ProjectsPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
