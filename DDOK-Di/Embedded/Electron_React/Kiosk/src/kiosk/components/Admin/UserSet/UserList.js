import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import userListToAdminIcon from "../../../assets/backArrow.png";
import axios from "axios";
import "./UserList.css";

function UserList(props) {
    const [platform, setPlatform] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(7);
    const jwt = props.jwt;

    const onClick = e => {
        props.setId(e.target.id);
        props.setComp("Info");
    };

    function getUsers() {
        axios("https://i7a102.p.ssafy.io/api/admin/users", {
            method: "GET",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(async res => {
                setPlatform(res.data);
                setRows(res.data);
                // console.log(res.data);
            })
            .catch(error => {
                console.error("실패:", error);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);
    const columns = [
        // { field: 'id', headerName: 'id', width: 80 },
        { field: "name", headerName: "name", width: 150 },
        { field: "position", headerName: "position", width: 150 },
        { field: "email", headerName: "email", width: 250 },
        { field: "height", headerName: "height", width: 110 },
        { field: "phoneNumber", headerName: "phone", width: 200 },
        {
            field: "detailButton",
            headerName: "detail",
            sortable: false,
            width: 150,
            renderCell: params => (
                <button id={params.row.id} onClick={onClick}>
                    상세보기
                </button>
            ),
        },
    ];

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    const requestSearch = searchValue => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = platform.filter(row => {
            return Object.keys(row).some(field => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    return (
        <div className="userListContainer">
            <div className="adminToHomeBtnArea">
                <h1>사용자 목록</h1>
            </div>
            <div className="userSetToAdminBtnArea">
                <Link to={`/admin`} state={{ jwt: `${jwt}` }}>
                    <img
                        src={userListToAdminIcon}
                        alt="userInfoToListIcon"
                        className="userInfoToListIcon"
                    />
                </Link>
            </div>
            <div className="userListBox">
                <Box>
                    <TextField
                        variant="standard"
                        value={searchText}
                        onChange={e => {
                            setSearchText(e.target.value);
                            requestSearch(e.target.value);
                        }}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <SearchIcon fontSize="small" color="action" />
                            ),
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    style={{
                                        visibility: searchText
                                            ? "visible"
                                            : "hidden",
                                        borderRadius: "57%",
                                        paddingRight: "1px",
                                        margin: "0",
                                        fontSize: "1.25rem",
                                    }}
                                    onClick={e => {
                                        setSearchText("");
                                        setRows(platform);
                                    }}
                                >
                                    <ClearIcon
                                        fontSize="small"
                                        color="action"
                                    />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            width: { xs: 1, sm: "auto" },
                            m: theme => theme.spacing(1, 0.5, 1.5),
                            "& .MuiSvgIcon-root": {
                                mr: 1,
                            },
                            "& .MuiInput-underline:before": {
                                borderBottom: 1,
                                borderColor: "divider",
                            },
                        }}
                    />
                </Box>
                <DataGrid
                    disableColumnMenu
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                    rowsPerPageOptions={[7, 10, 20]}
                    pagination
                />
            </div>
        </div>
    );
}

export default UserList;
