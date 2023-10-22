import axios from "axios";
import { BaseAPI, ProjectID } from "../constants/constants";

const api = axios.create({
  baseURL: BaseAPI,
});

//
//This section I don`t understnad!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Login
export const loginUser = async (email, password) => {
  const response = await api.post(`/login/${ProjectID}`, {
    Email: email,
    Password: password,
  });
  return response.data;
};

// Register User
export const registerUser = async (email, password, name) => {
  const response = await api.post("/user/", {
    ProjectID: ProjectID,
    Email: email,
    Password: password,
    Role: "Guest",
    Name: name,
  });
  return response.data;
};

// Register User
// export const updateUser = async (token, email, password, name) => {
//   const response = await api.put(
//     `/user/${ProjectID}`,
//     {
//       ProjectID: ProjectID,
//       Email: email,
//       Password: password,
//       Role: "Guest",
//       Name: name,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

export const updateUser = (token, email, password, name, role, favorites) => {
  return api
    .put(
      `/user/${ProjectID}/${email}`,
      {
        ProjectID: ProjectID,
        Email: email,
        Password: password,
        Role: role,
        Name: name,
        Favorites: favorites,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};

// Get single user
export const getUser = async (email) => {
  const response = await api.get(`/user/object/${ProjectID}/${email}`);
  return response.data;
};

// Get all users??? copied it from the new api in the new card-comapny by the teacher

export const getUsers = (token) => {
  return api
    .get(`/user/${ProjectID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

// Delete user
// export const deleteUser = (token, email) => {
//   return api
//     .delete(`/user/${ProjectID}/${email}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error getting user:", error);
//       throw error;
//     });
// };

export const deleteUser = (token, email) => {
  return api
    .delete(`/user/${ProjectID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

// Post Item
export const postItem = async (token, itemCategory, data) => {
  const response = await api.post(`/item/${ProjectID}_${itemCategory}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all items for a project
//This is how you get all the cards array from the api ******************
export const getItems = async (token, itemCategory) => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  const response = await api.get(`/item/${ProjectID}_${itemCategory}`, config);
  return response.data;
};

// Update item

export const updateItem = (token, itemCategory, itemId, data) => {
  return api
    .put(`/item/${ProjectID}_${itemCategory}/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

// export const updateItem = async (token, itemCategory, itemId, data) => {
//   console.log("update");
//   const response = await api.put(
//     `/item/${ProjectID}_${itemCategory}/${itemId}`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// Delete item
export const deleteItem = async (token, itemCategory, itemId) => {
  console.log("delete step 1");
  const response = await api.delete(
    `/item/${ProjectID}_${itemCategory}/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("delete step 2");
  console.log(token);
  console.log(itemCategory);
  console.log(itemId);
  return response.data;
};
