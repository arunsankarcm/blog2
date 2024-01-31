import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login'; // Import Login component
import Signup from './signup'; // Import Signup component
import HomePage from './homepage'; // Import a Home page component
import { AuthProvider } from './authcontext';
import Post from './posts'; // Import Posts component
import PostDetails from './postdetail'; // Import PostDetails component
import ProtectedRoute from './protectedroute';
import CreatePost from './createpost'; 



const App = () => {
  return (
   <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postID"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
            />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
   </AuthProvider>
  );
};

export default App;
