import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import useApp from "@hooks/useAppContext";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@material-ui/lab";
import { useAppDispatch } from "@hooks/store";
import { loggedOut } from "@store/actions/auth";
import { State } from "@mui-treasury/layout/types";
import ListItemLink from "@components/ui/ListItemLink";
import styled, { ThemeProvider } from "styled-components";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindMenu, bindTrigger } from "material-ui-popup-state";
import { createStyles, makeStyles, StylesProvider, useTheme, } from "@material-ui/core/styles";
import { BookOpenPageVariantOutline, Cart, PackageVariant, ShapeOutline, ListStatus, FaceAgent, AccountCash } from 'mdi-material-ui'
import Layout, {
    Root,
    getFooter,
    getHeader,
    getContent,
    getCollapseBtn,
    getCollapseIcon,
    getInsetFooter,
    getDrawerSidebar,
    getSidebarTrigger,
    getInsetContainer,
    getSidebarContent,
    getInsetAvoidingView,
} from "@mui-treasury/layout";
import {
    Box,
    Fade,
    List,
    Menu,
    Switch,
    Avatar,
    Toolbar,
    MenuItem,
    Typography,
    IconButton,
    CssBaseline,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Button,
} from "@material-ui/core";
import {
    Forum,
    Redeem,
    Settings,
    FiberNew,
    Dashboard,
    FeaturedPlayList,
    AccountCircleOutlined,
    MonetizationOnOutlined,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon,
    Brightness5 as Brightness5Icon,
    Brightness7 as Brightness7Icon,
    LocalOffer,
    Movie,
} from "@material-ui/icons";

const Header = getHeader(styled);
const Footer = getFooter(styled);
const Content = getContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const InsetFooter = getInsetFooter(styled);
const CollapseIcon = getCollapseIcon(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const InsetContainer = getInsetContainer(styled);
const InsetAvoidingView = getInsetAvoidingView(styled);

const scheme = Layout();

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            flex: 1
        },
        leftDrawerPaperAnchorLeft: {

        },
        collapseBtn: {
        },
        header: {
        },
        headerToolbar: {

        },
        drawerSidebarContent: {
        },
        drawerSidebarContentColse: {},
        navItemRoot: {

        },
        navItemNested: {

        },
        navItemSelected: {

        },
        navPrimaryText: {
            fontSize: 16,
            fontWeight: 700,
            // color: theme.palette.common.white,
            transition: theme.transitions.create(["opacity", "lineHeight"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        navPrimaryTextCollapsed: {

        },
        navIcon: {
        },
        menuPaper: {
        },
        notificationTrayPaper: {

        },
    })
);

const PrivateLayout: React.FC = (props) => {
    const app = useApp();
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [layoutState] = React.useState<State>({
        sidebar: {
            left_sidebar: {
                open: true,
                collapsed: false,
            },
        },
    });
    const accountMenuPopupState = usePopupState({
        variant: "popover",
        popupId: "primary-search-account-menu",
    });


    scheme.configureHeader((builder) => {
        builder
            .registerConfig("xs", {
                position: "sticky",
                initialHeight: 64,
            })
            .registerConfig("md", {
                position: "relative", // won't stick to top when scroll down
                initialHeight: 64,
            });
    });

    scheme.configureEdgeSidebar((builder) => {
        builder
            .create("left_sidebar", { anchor: "left" })
            .registerTemporaryConfig("xs", {
                anchor: "left",
                width: 250,
            } as any)
            .registerPersistentConfig("lg", {
                width: 270,
                collapsible: true,
                autoExpanded: true,
                persistentBehavior: "fit",

            });
    });

    const handleLogout = () => {
        dispatch(loggedOut())
    };

    return (
        <Root scheme={scheme} initialState={layoutState} theme={theme}>
            {(layoutProps) => {
                return (
                    <StylesProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Box
                                display={"flex"}
                                minHeight={"100vh"}
                                flexDirection={"column"}
                            >
                                <Helmet>
                                    <title>{"Sakila Admin"}</title>
                                </Helmet>

                                {/* <Box pt={3.5} pl={3.5}> */}

                                {/* <CollapseIcon
                                        size={"small"}
                                        disableRipple
                                        sidebarId="left_sidebar"
                                        className={classes.collapseBtn}
                                    >
                                        {({ collapsed, anchor }) => {
                                            return <MenuIcon fontSize={"small"} />;
                                        }}
                                    </CollapseIcon> */}
                                {/* </Box> */}

                                <Header
                                    elevation={0}
                                    position={"fixed"}
                                    className={classes.header}
                                >
                                    <Toolbar className={classes.headerToolbar}>
                                        <SidebarTrigger sidebarId={"left_sidebar"} />

                                        <Box flex={1} pl={3}></Box>

                                        <Box mr={3}>
                                            {/* <IconButton
                                                size={"small"}
                                                {...bindTrigger(notificationMenuPopupState)}
                                                onClick={(event) => {
                                                    notificationMenuPopupState.open(event);
                                                }}
                                            >
                                                <Badge
                                                    variant={"dot"}
                                                    color={"primary"}
                                                    overlap={"circular"}
                                                >
                                                    <NotificationsNoneIcon />
                                                </Badge>
                                            </IconButton> */}
                                        </Box>

                                        <IconButton
                                            edge={"end"}
                                            size={"small"}
                                            {...bindTrigger(accountMenuPopupState)}
                                        >
                                            <Avatar />
                                        </IconButton>
                                    </Toolbar>
                                </Header>

                                {/* Profile Menu */}
                                <Menu
                                    {...bindMenu(accountMenuPopupState)}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    PaperProps={{
                                        square: true,
                                    }}
                                    classes={{
                                        paper: classes.menuPaper,
                                    }}
                                    TransitionComponent={Fade}
                                    variant={"selectedMenu"}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Brightness5Icon />
                                        </ListItemIcon>
                                        <Switch
                                            color={"primary"}
                                            checked={app.darkMode}
                                            onChange={app.toggleDarkMode}
                                        />
                                        <ListItemSecondaryAction>
                                            <Brightness7Icon />
                                        </ListItemSecondaryAction>
                                    </MenuItem>

                                    <MenuItem button component={Link} to={"/settings"}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Settings"}
                                            primaryTypographyProps={{
                                                color: "textSecondary",
                                            }}
                                        />
                                    </MenuItem>

                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Logout"}
                                            primaryTypographyProps={{
                                                color: "textSecondary",
                                            }}
                                        />
                                    </MenuItem>
                                </Menu>

                                <DrawerSidebar
                                    elevation={0}
                                    sidebarId={"left_sidebar"}
                                    classes={{
                                        paperAnchorLeft: classes.leftDrawerPaperAnchorLeft,
                                    }}
                                >
                                    <SidebarContent
                                        className={clsx(classes.drawerSidebarContent, {
                                            [classes.drawerSidebarContentColse]:
                                                layoutProps.state.sidebar.left_sidebar.collapsed,
                                        })}
                                    >
                                        {/* <Box mt={2}>
                                            <Box
                                                width={195}
                                                margin={"auto"}
                                                borderRadius={5}
                                                fontWeight={700}
                                                fontSize={"22px"}
                                                textAlign={"center"}
                                                color={"primary.main"}
                                                bgcolor={"common.white"}
                                            >
                                                <img
                                                    src={""}
                                                    alt={"logo"}
                                                />
                                            </Box>
                                        </Box> */}

                                        <Box mt={4}>
                                            <List>
                                                <ListItemLink
                                                    to={"/dashboard"}
                                                    path={"/dashboard"}
                                                    alignItems={"center"}
                                                    classes={{
                                                        root: classes.navItemRoot,
                                                        selected: classes.navItemSelected,
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <MonetizationOnOutlined />
                                                    </ListItemIcon>


                                                    <ListItemText
                                                        primary={"Sales"}
                                                        primaryTypographyProps={{
                                                            className: clsx(classes.navPrimaryText, {
                                                                [classes.navPrimaryTextCollapsed]:
                                                                    layoutProps.state.sidebar.left_sidebar
                                                                        .collapsed,
                                                            }),
                                                        }}
                                                    />
                                                </ListItemLink>

                                                <ListItemLink
                                                    to={"/films"}
                                                    path={"/films"}
                                                    alignItems={"center"}
                                                    classes={{
                                                        root: classes.navItemRoot,
                                                        selected: classes.navItemSelected,
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Movie />
                                                    </ListItemIcon>


                                                    <ListItemText
                                                        primary={"Films"}
                                                        primaryTypographyProps={{
                                                            className: clsx(classes.navPrimaryText, {
                                                                [classes.navPrimaryTextCollapsed]:
                                                                    layoutProps.state.sidebar.left_sidebar
                                                                        .collapsed,
                                                            }),
                                                        }}
                                                    />
                                                </ListItemLink>

                                                <ListItemLink
                                                    to={"/staves"}
                                                    path={"/staves"}
                                                    alignItems={"center"}
                                                    classes={{
                                                        root: classes.navItemRoot,
                                                        selected: classes.navItemSelected,
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <FaceAgent />
                                                    </ListItemIcon>


                                                    <ListItemText
                                                        primary={"Staves"}
                                                        primaryTypographyProps={{
                                                            className: clsx(classes.navPrimaryText, {
                                                                [classes.navPrimaryTextCollapsed]:
                                                                    layoutProps.state.sidebar.left_sidebar
                                                                        .collapsed,
                                                            }),
                                                        }}
                                                    />
                                                </ListItemLink>

                                                <ListItemLink
                                                    to={"/customers"}
                                                    path={"/customers"}
                                                    alignItems={"center"}
                                                    classes={{
                                                        root: classes.navItemRoot,
                                                        selected: classes.navItemSelected,
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <AccountCash />
                                                    </ListItemIcon>


                                                    <ListItemText
                                                        primary={"Customers"}
                                                        primaryTypographyProps={{
                                                            className: clsx(classes.navPrimaryText, {
                                                                [classes.navPrimaryTextCollapsed]:
                                                                    layoutProps.state.sidebar.left_sidebar
                                                                        .collapsed,
                                                            }),
                                                        }}
                                                    />
                                                </ListItemLink>
                                            </List>
                                        </Box>
                                    </SidebarContent>
                                </DrawerSidebar>

                                <Box flex={1} position={"relative"} display={"flex"} flexDirection={"column"}>
                                    <Content className={classes.content}>
                                        <InsetContainer maxWidth={"xl"}>
                                            <React.Fragment>{props.children}</React.Fragment>
                                        </InsetContainer>
                                    </Content>

                                    <Footer >
                                        <InsetAvoidingView>
                                            <div>
                                                <Toolbar>
                                                    <Typography variant={"overline"} align={"center"}>
                                                        {new Date().getFullYear()} &copy;{" "}

                                                    </Typography>
                                                    <Box component={"span"} ml={0.5}>
                                                        Developed By FIFOTech v2.0.0
                                                    </Box>
                                                </Toolbar>
                                            </div>
                                        </InsetAvoidingView>
                                    </Footer>
                                </Box>
                            </Box>
                        </ThemeProvider>
                    </StylesProvider>
                );
            }}
        </Root>
    );
};

export default PrivateLayout;
