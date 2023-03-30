import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Blogs from "./scenes/blogs";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AccountDetails from "./scenes/AccountInfo";
import AddBlog from "./scenes/blogs/addBlog";
import EditBlog from "./scenes/blogs/editBlog";
import Roles from "./scenes/roles";
import { SnackbarProvider } from "notistack";
import LoginPage from "./scenes/auth/LoginPage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <SnackbarProvider maxSnack={3}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/account/:_id" element={<AccountDetails />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/editblog/:id" element={<EditBlog />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="*" element={<h1>404: Not Found</h1>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
