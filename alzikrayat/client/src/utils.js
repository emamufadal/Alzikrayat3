export function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// populated users only have firstName and lastName; the user can be null if deleted
export function fullName(user) {
  return user ? `${user.firstName} ${user.lastName}` : 'Unknown user';
}
