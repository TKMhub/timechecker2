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
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { firebasedb } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const WorkTimeChecker = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [years, setYears] = useState(
    new Date().toISOString().slice(0, 10) // 初期値を現在の日付に設定
  );
  const [workTime, setWorkTime] = useState("");
  const [holidayTime, setHolidayTime] = useState("");
  const [open, setOpen] = useState(false);

  // Firestoreにデータを保存する関数
  const saveDataToFirestore = async () => {
    // ログ出力はデバッグ目的で残しています。
    console.log({
      employeeId,
      date: years,
      workTime,
      holidayTime,
    });

    try {
      // コレクションへの参照を作成し、ドキュメントを追加します。
      await addDoc(collection(firebasedb, "workTimes"), {
        employeeId,
        date: years,
        workTime,
        holidayTime,
      });
      console.log("データの書き込みに成功しました。");
    } catch (error) {
      console.error("データの書き込みに失敗しました。");
      console.error("エラー内容: ", error);
    }
  };

  // 登録ボタンを押した時のハンドラーを更新
  const handleRegister = () => {
    // ダイアログを開く
    handleClickOpen();
    // データを保存
    saveDataToFirestore();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs
          style={{ margin: "0 auto", marginTop: "80px", padding: "20px" }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            align="center"
          >
            TimeChecker
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center">
            法定超過時間チェッカー
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="社員番号"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <TextField
              id="years"
              label="年月日"
              type="date"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              InputLabelProps={{
                shrink: true, // ラベルを縮小
              }}
              style={{ width: "140px" }}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            label="合計勤務時間"
            variant="outlined"
            fullWidth
            onChange={(e) => setWorkTime(e.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            label="法定休日時間(日曜勤務)"
            variant="outlined"
            fullWidth
            onChange={(e) => setHolidayTime(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ width: "200px" }}
          >
            登録
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">登録情報</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`社員番号：${employeeId}`}
            <br />
            {`対象年月日：${years}月`}
            <br />
            {`合計勤務時間：${workTime}`}
            <br />
            {`法定休日時間：${holidayTime}`}
            <br />
            <br />
            上記の内容で登録しました。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkTimeChecker;
