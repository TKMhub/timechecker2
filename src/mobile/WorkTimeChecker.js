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

  const [message1, setmessage1] = useState("");
  const [message2, setmessage2] = useState("");
  const [message3, setmessage3] = useState("");

  //{`勤務-休日(分)：${message4}`}
  //<br />
  //{`労働(分)：${message5}`}
  //<br />
  //{`予測45h(分)：${message6}`}
  //<br />
  //{`予測60h(分)：${message7}`}
  //<br />
  //{`経過/月日数：${message8}`}
  //const [message4, setmessage4] = useState("");
  //const [message5, setmessage5] = useState("");
  //const [message6, setmessage6] = useState("");
  //const [message7, setmessage7] = useState("");
  //const [message8, setmessage8] = useState("");

  // Firestoreにデータを保存する関数
  const saveDataToFirestore = async () => {
    // ログ出力はデバッグ目的で残しています。
    console.log({
      employeeId,
      date: years,
      workTime,
      holidayTime,
    });

    //test

    let firestore = firebasedb.firestore();

    //新規documentIDでReferensePathを作成
    let userRef = firestore.collection("users").document();
    let data1 = ["name", "userA"];
    let merge = "test";

    //ドキュメントが存在しないため失敗する
    userRef.updateData(data1);

    //ドキュメントが存在しないのでcreateされる
    userRef.setData(data1, merge, true);
    /*
    user > {documentID} > ["name":"userA"]
    */

    //ドキュメントそのものがupdateされるためnameフィールドは消える
    let data2 = ["age", 21];
    userRef.setData(data2);
    /*
    user > {documentID} > ["age": 21]
    */

    //ドキュメントが存在するためフィールドがupdateされる。ageフィールドは消えない
    //userRef.updateData(data1, merge: true)と同じ挙動
    userRef.setData(data1, merge, true);

    // ドキュメントの参照を作成します
    //const workTimesCollectionRef = collection(firebasedb, "workTimes");
    //try {
    // ドキュメントを追加します
    //  const docRef = await addDoc(workTimesCollectionRef, "test", {
    //    employeeId,
    //    date: years,
    //    workTime,
    //    holidayTime,
    //  });
    //  console.log("Document written with ID: ", docRef.id);
    //} catch (e) {
    //  console.error("Error adding document: ", e);
    //}
    //  console.log("データの書き込みに成功しました。");
    //} catch (error) {
    //  console.error("データの書き込みに失敗しました。");
    //  console.error("エラー内容: ", error);
    //}

    // Firestoreへの参照を取得
    //var db = firebase.firestore();
    // コレクションとドキュメントの参照
    var collectionName = "workTimes"; // コレクション名
    var documentName = "test"; // ドキュメント名
    // 書き込むデータ
    var data = {
      key1: "value1",
      key2: "value2",
    };

    // コレクション内のドキュメントにデータを書き込み
    firestore
      .collection(collectionName)
      .doc(documentName)
      .set(data)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  // 登録ボタンを押した時のハンドラーを更新
  const handleRegister = () => {
    // 超過チェッカー
    ChokaChecker(years, workTime, holidayTime);
    //setmessage1(${Math.floor(parseInt(Zangyo) / 60)}時間${ parseInt(Zangyo) % 60 });
    setmessage1(
      `${Math.floor(parseInt(Zangyo) / 60)}時間${parseInt(Zangyo) % 60}分` //
    );
    setmessage2(hmsg);
    setmessage3(ymsg);
    //setmessage4(TimeGokei - TimeKyujitsu);
    //setmessage5(TimeRodo);
    //setmessage6(Yosoku45h);
    //setmessage7(Yosoku60h);
    //setmessage8(Yosoku00h);

    // ダイアログを開く
    handleClickOpen();
    // データを保存
    //saveDataToFirestore();
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
              style={{ width: "165px" }}
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
            style={{ width: "165px" }}
          >
            チェック
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
            上記の内容でチェックしました。
            <br />
            <br />
            {`あなたの残業時間は${message1}です。`}
            <br />
            {`${message2}`}
            <br />
            {`${message3}`}
            <br />
            <br />
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

let test = "";
let TimeGokei = "";
let TimeKyujitsu = "";
let TimeRodo = "";
let hmsg = "";
let ymsg = "";
let Zangyo = "";
let Nissu = "";
let Hantei45 = "";
let Hantei60 = "";
let Yosoku45h = "";
let Yosoku60h = "";
let Yosoku00h = "";

const ChokaChecker = (yyyy_mm_dd, Gokei, Kyujitsu) => {
  //日付けの「-」除去
  let yyyymmdd = yyyy_mm_dd.replace(/-/g, "");
  //対象月の日数算出
  Nissu = TsukiNissu(yyyymmdd);
  //残業時間算出(分表示)
  Zangyo = ZangyoJikan(Gokei, Kyujitsu, Nissu);
  //超過判定
  hmsg = ChokaHantei(yyyy_mm_dd, Zangyo, Kyujitsu);
  //超過予測
  ymsg = ChokaYosoku(yyyy_mm_dd);
  //残業時間を時分へ
  //Zangyo = `${Math.floor(Zangyo / 60)}時間${ Zangyo % 60 }分`
  //結果を返す
  return;
};

//月日数を求める
const TsukiNissu = (yyyymmdd) => {
  const dateStr = yyyymmdd; // 分割したい日付文字列

  let year = dateStr.slice(0, 4); // 年を取得
  let month = dateStr.slice(4, 6); // 月を取得

  return new Date(year, month, 0).getDate();
};

//残業時間を求める
const ZangyoJikan = (GokeiKinmuJikan, HoteiKyujitsuJikan, TsukiNissu) => {
  const dateStrGokei = GokeiKinmuJikan; // 分割したい合計勤務時間
  const dateStrKyujitsu = HoteiKyujitsuJikan; // 分割したい法廷休日時間

  let hhGokei = dateStrGokei.split(":")[0]; // 年を取得
  let mmGokei = dateStrGokei.split(":")[1]; // 月を取得
  let hhKyujitsu = dateStrKyujitsu.split(":")[0]; // 年を取得
  let mmKyujitsu = dateStrKyujitsu.split(":")[1]; // 月を取得

  if (!hhGokei) {
    hhGokei = "0";
  }
  if (!mmGokei) {
    mmGokei = "0";
  }

  if (!hhKyujitsu) {
    hhKyujitsu = "0";
  }
  if (!mmKyujitsu) {
    mmKyujitsu = "0";
  }

  //TimeGokei    = parseInt(hhGokei) * 60 + parseInt(mmGokei)        //分変換
  //TimeKyujitsu = parseInt(hhKyujitsu) * 60 + parseInt(mmKyujitsu)  //分変換
  //TimeRodo = ( Math.floor( (parseInt(TsukiNissu) / 7 * 40 ) * Math.pow( 10, 1 ) ) / Math.pow( 10, 1 ) ) * 60; //分変換
  TimeGokei = parseInt(hhGokei) * 60 + parseInt(mmGokei); //分変換
  TimeKyujitsu = parseInt(hhKyujitsu) * 60 + parseInt(mmKyujitsu); //分変換
  //TimeRodo = ( Math.floor( (parseInt(TsukiNissu) / 7 * 40 ) * 10 ) / 10 )
  TimeRodo = Math.floor(
    (Math.floor((parseInt(TsukiNissu) / 7) * 40 * 10) / 10) * 60
  );

  //マイナスだったら残業 0 判定
  let TimeZangyo =
    parseInt(TimeGokei) - parseInt(TimeKyujitsu) - parseInt(TimeRodo);
  if (parseInt(TimeZangyo) <= 0) {
    TimeZangyo = "0";
  }

  return TimeZangyo;
};

// 45h 60h 超過申請判定
const ChokaHantei = (yyyy_mm_dd, Zangyo, Nissu) => {
  //超過したら申請が必要な時間
  const Choka45h = 35; //45hに対し
  const Choka60h = 50; //60hに対し

  //  let Hantei45 = parseInt(Choka45h) * 60;
  //  let Hantei60 = parseInt(Choka60h) * 60;
  Hantei45 = parseInt(Choka45h) * 60;
  Hantei60 = parseInt(Choka60h) * 60;

  //超過判定)
  let HanteiMessage = "";
  if (Hantei60 <= Zangyo) {
    HanteiMessage = "基準超過残業申請書（６０Ｈ／月超）を提出してください。";
  } else if (Hantei45 <= Zangyo) {
    HanteiMessage = "基準超過残業申請書（４５Ｈ／月超）を提出してください。";
  } else {
    HanteiMessage = "申請書の提出は必要ありません。";
  }

  return HanteiMessage;
};

// 45h 60h 超過申請予測
const ChokaYosoku = (yyyy_mm_dd) => {
  let HanteiYosoku = "";
  //経過日数取得
  var from = new Date(yyyy_mm_dd);
  var to = new Date(yyyy_mm_dd);
  from.setDate(1);
  let Youbi = to.getDay();
  if (Youbi === 0 && !(yyyy_mm_dd.slice(8, 10) === "01")) {
    to.setDate(to.getDate() - 1);
  }
  // 経過時間をミリ秒で取得
  var ms = to.getTime() - from.getTime();
  // ミリ秒を日付に変換(端数切捨て)
  var days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  //　予測判定
  Yosoku60h = (TimeRodo + 60 * 60) * (days / Nissu);
  Yosoku45h = (TimeRodo + 45 * 60) * (days / Nissu);
  Yosoku00h = days / Nissu;
  if (TimeGokei - TimeKyujitsu > (TimeRodo + 60 * 60) * (days / Nissu)) {
    HanteiYosoku = "残業時間が６０Ｈを超えるペースです。";
  } else if (TimeGokei - TimeKyujitsu > (TimeRodo + 45 * 60) * (days / Nissu)) {
    HanteiYosoku = "残業時間が４５Ｈを超えるペースです。";
  }

  return HanteiYosoku;
};

export default WorkTimeChecker;
