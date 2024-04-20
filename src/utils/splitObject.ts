export const splitObject = (originalObject) => {
  const locker = originalObject.find((mesh) => {
    return mesh.name === 'Locker';
  });
  const lockerDoor = originalObject.find((mesh) => {
    return mesh.name === 'LockerDoor';
  });
  const image = originalObject.find((mesh) => {
    return mesh.name === 'Image';
  });
  return [locker, lockerDoor, image];
};
