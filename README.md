"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
Container,
TextField,
FormControl,
Select,
MenuItem,
Button,
Grid,
} from "@mui/material";

const WorkTimeChecker: React.FC = () => {
const [employeeId, setEmployeeId] = useState("");
const [month, setMonth] = useState("");
const [workTime, setWorkTime] = useState("");
const [holidayTime, setHolidayTime] = useState("");
const [open, setOpen] = useState(false);

// ダイアログを開く
const handleClickOpen = () => {
setOpen(true);
};

// ダイアログを閉じる
const handleClose = () => {
setOpen(false);
};

return (
<Container>
<Grid container spacing={3} direction="column" alignItems="center">
<Grid item sx={{ padding: "20px" }}>
<h1 className="mt-14 p-2 text-center font-sans text-gray-500 font-extrabold text-2xl ">
TimeChecker
</h1>
<h2 className="p-1 text-center text-xm">法定超過時間チェッカー</h2>
</Grid>

        <Grid item>
          <TextField
            label="社員番号:"
            variant="outlined"
            style={{ width: "200px" }}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </Grid>

        <Grid item>
          <p className="text-left text-xs text-gray-400">対象月：</p>
          <FormControl variant="outlined" style={{ width: "200px" }}>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              <MenuItem value={1}>1月</MenuItem>
              <MenuItem value={2}>2月</MenuItem>
              <MenuItem value={3}>3月</MenuItem>
              <MenuItem value={4}>4月</MenuItem>
              <MenuItem value={5}>5月</MenuItem>
              <MenuItem value={6}>6月</MenuItem>
              <MenuItem value={7}>7月</MenuItem>
              <MenuItem value={8}>8月</MenuItem>
              <MenuItem value={9}>9月</MenuItem>
              <MenuItem value={10}>10月</MenuItem>
              <MenuItem value={11}>11月</MenuItem>
              <MenuItem value={12}>12月</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            label="合計勤務時間:"
            variant="outlined"
            style={{ width: "200px" }}
            onChange={(e) => setWorkTime(e.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            label="法定休日時間:"
            variant="outlined"
            style={{ width: "200px" }}
            onChange={(e) => setHolidayTime(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", width: "200px" }}
            onClick={handleClickOpen}
          >
            登録
          </Button>
        </Grid>
      </Grid>
      {/* ダイアログの定義 */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"登録情報"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`社員番号：${employeeId}`}
            <br />
            {`対象月：${month}月`}
            <br />
            {`合計勤務時間：${workTime}`}
            <br />
            {`法定休日時間：${holidayTime}`}
            <br />
            <br />
            {"上記の内容で登録しました。"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

);
};

export default WorkTimeChecker;

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
