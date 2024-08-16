const paths = {
  //home
  home_base: "/",
  getHomeFullPath: (subPath) => `/${subPath}`,
  home: "/",
  login: "/login",

  //Room
  room: "/room",
 room_create: "create",
 room_edit: "edit/:id",
  getRoomEdit: (id) => `edit/${id}`,

  //Room Type
  room_type: "/room_type",
  room_type_create: "create",
  room_type_edit: "edit/:id",
  getRoomTypeEdit: (id) => `edit/${id}`,

  // Booking
  booking:"/booking"

};

paths.combine = (...args) => {
  return args.reduce((final, current) => `${final}/${current}`, paths.home_base);
};

export default paths;
