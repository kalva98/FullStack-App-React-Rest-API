import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
    alert('Come back again!');
    context.actions.signOut();
    return (
    <Redirect to="/" />
  );
}
export default UserSignOut;