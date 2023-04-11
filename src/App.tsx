import React from 'react';
import './App.css';
import {Breadcrumb, Layout, Menu, MenuProps, Space, theme, Typography} from "antd";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {HashRouter, Link, NavLink, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./page/home/Home";
import ProjectsPage from "./page/project/ProjectsPage";
import ProjectDetailPage from "./page/project/ProjectDetailPage";
import {Provider} from "react-redux";
import {store} from "./state";

const {Text} = Typography;

const items: MenuProps['items'] = [
    {
        label: (
            <NavLink to="/">Home</NavLink>
        ),
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: (
            <NavLink to="/projects">Projects</NavLink>
        ),
        key: '/projects',
        icon: <ProjectOutlined/>
    },
];

const breadCrumbMap: Record<string, string> = {
    '/projects': 'Projects'
}


function Page() {
    const {token: {colorBgContainer}} = theme.useToken();
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const text = breadCrumbMap[url] ? breadCrumbMap[url] : 'Detail';
        return {
            key: url,
            text: text,
            title: <Link to={url}>{text}</Link>,
        };
    });
    let breadCrumbItems = [{
        title: <Link to="/">Home</Link>,
        text: 'Home',
        key: 'home',
    }].concat(extraBreadcrumbItems);

    return (
        <div className="container">
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        items={items}
                        selectedKeys={[location.pathname]}
                    />
                </Header>
                <Content className="content">
                    <Breadcrumb className="breadcrumb" separator=">" items={breadCrumbItems}/>
                    <div className="site-layout-content" style={{background: colorBgContainer}}>
                        <Routes>
                            <Route path="/"
                                   key="home"
                                   element={<HomePage/>}
                            />
                            <Route path="/projects"
                                   key="projects"
                                   element={<ProjectsPage/>}
                            />
                            <Route path="/projects/:id"
                                   key="detail"
                                   element={<ProjectDetailPage/>}
                            />
                        </Routes>
                    </div>
                </Content>
                <Footer>
                    <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                        <Text>Developed by Eden.</Text>
                    </Space>
                </Footer>
            </Layout>
        </div>
    );
}

const App: React.FC = () => (
    <Provider store={store}>
        <HashRouter>
            <Page/>
        </HashRouter>
    </Provider>
);

export default App;
