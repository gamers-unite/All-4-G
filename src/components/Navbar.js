import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MoreIcon from "@material-ui/icons/MoreVert";
import dark from "@material-ui/core/colors";
import { getCurrentUser, logout } from "../ducks/userReducer.js";
import Login from "./Login";
import Register from "./Register";
import styled from "styled-components";


const styles = theme => ({
    palette: {
        type: dark
    },
    root: {
        width: "100%"
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit * 3,
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },

    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    },

    modal: {
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.spacing.unit * 30,
        // boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        background: "rgba(192, 192, 192, 0.9)",
        borderRadius: "5%",
        outline: "none",
        webkitBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        mozBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        boxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)"
    }
});

class Nav extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        loggedIn: false,
        modal: false,
        showLogin: false,
        showRegister: false,
        refresh: false
    };

    loadData = async () => {
        await this.props.getCurrentUser();
        if (this.props.user.id) {
            this.setState({ loggedIn: true, refresh: false });
        }
    };

    componentDidMount = () => {
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh) {
            this.loadData();
        }
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleLogout = async () => {
        await logout();
        this.handleMenuClose();
        this.setState({ loggedIn: false, refresh: true });
    };

    openLogin = () => {
        this.setState({ showLogin: true, showRegister: false, modal: true });
    };

    openRegister = () => {
        this.setState({ showLogin: false, showRegister: true, modal: true });
    };

    closeModal = () => {
        this.setState({ showLogin: false, showRegister: false, modal: false });
    };

    toggleRefresh = () => {
        this.setState({ refresh: true });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/profile">
                    <MenuItem style={{backgroundColor: 'rgba(20,20,20, 0.9)', color: '#ffffff', cursor: 'pointer'}} onClick={this.handleMenuClose}>Profile</MenuItem>
                </Link>
                <Link to="/">
                    <MenuItem style={{backgroundColor: 'rgba(20,20,20, 0.9)', color: '#ffffff', cursor: 'pointer'}} onClick={this.handleLogout}>Logout</MenuItem>
                </Link>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/profile">
                    <MenuItem style={{backgroundColor: 'rgba(20,20,20, 0.9)', color: '#ffffff', cursor: 'pointer'}} onClick={this.handleMenuClose}>Profile</MenuItem>
                </Link>
                <Link to="/">
                    <MenuItem style={{backgroundColor: 'rgba(20,20,20, 0.9)', color: '#ffffff', cursor: 'pointer'}} onClick={this.handleLogout}>Logout</MenuItem>
                </Link>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar style={{ background: "#000000" }} position="static">
                    <Toolbar>
                        {/* <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Link to='/' style={{ color: "#ffffff", textDecoration: "none", cursor: 'pointer'}}>
                        <Logo src='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2FLogo.png?alt=media&token=205cab94-8e86-4908-8d4b-1ad20390d3d1'></Logo>
                        {/* <Typography
                            className={classes.title}
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            ALL.4.G
                        </Typography> */}
                        </Link>
                        {/* <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                            />
                        </div> */}
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {!this.state.loggedIn && (
                                <>
                                    <Button style={{ color: "#ffffff", cursor: 'pointer' }} onClick={this.openLogin}>
                                        Login
                                    </Button>
                                    <Button style={{ color: "#ffffff", cursor: 'pointer' }} onClick={this.openRegister}>
                                        Register
                                    </Button>
                                </>
                            )}
                            {this.state.loggedIn && (
                                <IconButton
                                    aria-owns={
                                        isMenuOpen
                                            ? "material-appbar"
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Avatar
                                        alt="avatar"
                                        src={this.props.user.avatar}
                                    />
                                </IconButton>
                            )}
                        </div>
                        <div className={classes.sectionMobile}>
                            {!this.state.loggedIn && (
                                <>
                                    <Button style={{ color: "#ffffff", cursor: 'pointer' }} onClick={this.openLogin}>
                                        Login
                                    </Button>
                                    <Button style={{ color: "#ffffff", cursor: 'pointer' }} onClick={this.openRegister}>
                                        Register
                                    </Button>
                                </>
                            )}
                            {this.state.loggedIn && (
                                <IconButton
                                    aria-haspopup="true"
                                    onClick={this.handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <Avatar
                                        alt="avatar"
                                        src={this.props.user.avatar}
                                    />
                                </IconButton>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
                <Modal 
                    className={classes.modalWrapper}
                    open={this.state.modal}
                    onClose={this.closeModal}
                >
                    <div className={classes.modal}>
                        {this.state.showLogin && (
                            <Login
                                closeModal={this.closeModal}
                                toggleRefresh={this.toggleRefresh}
                            />
                        )}
                        {this.state.showRegister && (
                            <Register
                                closeModal={this.closeModal}
                                toggleRefresh={this.toggleRefresh}
                            />
                        )}
                    </div>
                </Modal>
            </div>
        );
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(withStyles(styles)(Nav));

const Logo = styled.img`
 height: 4em;
`