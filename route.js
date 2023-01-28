const express = require('express');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const router = express.Router();
const { signUp, signIn, postotp, resend, Resetmail, ChangePass } = require('./Controller/auth');
const { GetUserByid, GetAlluser, GetUserByemail, UpdateUserStatus, UpdateUser,DeleteUser } = require('./Controller/user');
const {PostQuery,GetUserQuery,GetById,PostReply,getAllQueryById} = require('./Controller/query')
const {CreateLiscence,DeleteLiscence,UpdateLiscence,GetLiscenceType,ViewLiscenc,ToggleLiscence} = require('./Controller/liscence')
const {createLocation,viewData,updateList,GetLocationById,ToggleLocation,GetArea,GetSubArea} = require('./Controller/location_master')
const {CreateModule} = require('./Controller/module')
const Menu = require('./Controller/Menu')
const SubMenu = require('./Controller/submenu')
const UserRole = require('./Controller/Role.js')
router.post("/signup",upload.single('attach'), signUp);
router.post("/signin", signIn);
router.post("/otp", postotp);
router.post("/resendotp", resend)
router.post("/resetmail", Resetmail)
router.get("/getuserByemail/:id", GetUserByemail)
router.get("/getuserByid/:id", GetUserByid)
router.get("/getalluser", GetAlluser)
router.post('/updateUser', UpdateUser)
router.post('/DeleteUser',DeleteUser)
router.post("/changepass", ChangePass)
router.post('/CreateModule', Menu.CreateModules)
router.get("/getuserrolelist", UserRole.GetUserRoleList)
router.post("/createuserrole", UserRole.CreateUserRole)
router.put("/updateuserrole/:id", UserRole.UpdateUserRole)
router.put('/updateModule', Menu.UpdateModule)
router.post('/toggleModuleStatus',Menu.toggleModuleStatus)
router.get('/GetModuleList', Menu.GetModuleList)
router.post('/CreateSubModule', SubMenu.CreateSubModules)
router.put('/updateuserstatus', UpdateUserStatus)
router.post('/toggleRoleStatus', UserRole.toggleRoleStatus)
router.post('/deleteRole', UserRole.deleteRole)
router.post('/getRolebyid',UserRole.GetRoleByid)
router.post('/postquery',PostQuery)
router.get('/getuserquery',GetUserQuery)
router.post('/getquerybyid',GetById)
router.post('/postReply',PostReply)
router.post('/createLiscence',CreateLiscence)
router.post('/deleteliscence',DeleteLiscence)
router.post('/updateliscence',UpdateLiscence)
router.get('/getliscence',GetLiscenceType)
router.post('/viewliscence',ViewLiscenc)
router.post('/toggleliscence',ToggleLiscence)
router.post('/createmodule',CreateModule)
// router.get('/adminReplyid',AdminReply)
router.post('/getAllQueryById',getAllQueryById)
router.post('/createlocation',createLocation)
router.get('/viewlocationlist',viewData)
router.post('/updatelocationlist',updateList)
router.post('/getlocationbyid',GetLocationById)
router.post('/togglelocation',ToggleLocation)
router.get('/getarealist',GetArea)
router.get('/getsubarea',GetSubArea)

module.exports = router;