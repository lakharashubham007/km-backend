const express = require("express");
const router = express.Router();




// router.post("/createRole", validate(authValidation.register), checkRole, authController.register );




// Backup for sidebar menu code

// router.post("/sidebar-menus", async (req, res) => {
//   try {
//     const user = await User.findById(req.body.userid).populate('role');
    
//     // Get sidebar menus with submenus for the user's role
//     const sidebarMenus = await SidebarMenu.find({ _id: { $in: user.role.sidebarMenus } });

//     // Map sidebar menus and include submenus
//     const formattedSidebarMenus = sidebarMenus.map(menu => {
//       const formattedMenu = {
//         _id: menu._id,
//         menu: menu.menu,
//         parentMenu: menu.parentMenu,
//         type: menu.type,
//       };

//       // Check if the menu has submenus
//       const subMenus = sidebarMenus.filter(subMenu => subMenu.parentMenu === menu.menu);
//       if (subMenus.length > 0) {
//         formattedMenu.subMenus = subMenus
//           .filter(subMenu => subMenu.menu !== menu.menu) // Exclude submenus with the same name as parent menu
//           .map(subMenu => ({
//             _id: subMenu._id,
//             menu: subMenu.menu,
//             parentMenu: subMenu.parentMenu,
//             type: subMenu.type,
//           }));
//       }

//       return formattedMenu;
//     });

//     // Filter out main menus that are also present as submenus
//     const filteredSidebarMenus = formattedSidebarMenus.filter(menu =>
//       !formattedSidebarMenus.some(subMenu => subMenu.subMenus && subMenu.subMenus.some(sub => sub.menu === menu.menu))
//     );

//     res.json({ success: true, sidebarMenus: filteredSidebarMenus });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });
