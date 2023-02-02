export async function fetchUsers(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const defaultObject = {
  fetchUsers,
};

export default defaultObject;
