import UserList from "../components/Admin/UserSet/UserList";
import UserInfo from "../components/Admin/UserSet/UserInfo";
import UserModify from "../components/Admin/UserSet/UserModify";
import UserDelete from "../components/Admin/UserSet/UserDelete";
import { useLocation } from "react-router-dom";
import ModifySuccess from "../components/Admin/UserSet/ModifySuccess";
import DeleteSuccess from "../components/Admin/UserSet/DeleteSuccess";
import { useState } from "react";

function Admin() {
    const jwt = useLocation().state.jwt;
    const [comp, setComp] = useState("List");
    const [id, setId] = useState("");
    const [user, setUser] = useState();

    return (
        <div>
            <div className="userListPage">
                {comp === "List" ? (
                    <UserList setComp={setComp} setId={setId} jwt={jwt} />
                ) : null}
                {comp === "Info" ? (
                    <UserInfo
                        setComp={setComp}
                        id={id}
                        setUser={setUser}
                        jwt={jwt}
                    />
                ) : null}
                {comp === "Modify" ? (
                    <UserModify
                        setComp={setComp}
                        id={id}
                        user={user}
                        jwt={jwt}
                    />
                ) : null}
                {comp === "Delete" ? (
                    <UserDelete setComp={setComp} id={id} jwt={jwt} />
                ) : null}
                {comp === "ModifySuccess" ? (
                    <ModifySuccess setComp={setComp} id={id} />
                ) : null}
                {comp === "DeleteSuccess" ? (
                    <DeleteSuccess setComp={setComp} id={id} />
                ) : null}
            </div>
        </div>
    );
}

export default Admin;
