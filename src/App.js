import React, { useState } from "react";
import "./styles.css";
import gitImg from "./images/github (1).png";
import linkedinImg from "./images/linkedin (2).png";
import twitterImg from "./images/twitter (1).png";

export default function App() {
  const [birthdate, setBirthdate] = useState();
  const [datePalindrome, setDatePalindrome] = useState();
  const [NotPalindrome, setNotPalindrome] = useState();
  const [errorhandler, setErrorHandler] = useState();
  const [nextPalindrome, setNextPalindrome] = useState();
  const [difference, setDifference] = useState();
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function checkForPalindrome() {
    if (birthdate <= 0 || birthdate === undefined) {
      setErrorHandler(true);
    } else {
      setErrorHandler(false);
      var arr = birthdate.split("-");
      console.log(arr);

      let year = arr[0];
      let month = arr[1];
      let date = arr[2];

      let Palindrome = combination(date, month, year);
      if (Palindrome) {
        setDatePalindrome(true);
        setDatePalindrome(Palindrome);
        setNotPalindrome(false);
      } else {
        setDatePalindrome(false);
        setNotPalindrome(true);
        let [nextdate, diff] = nextDate(date, month, year);
        setNextPalindrome(nextdate);
        setDifference(diff);
      }
    }
  }

  function combination(dd, mm, yyyy) {
    let combo1 = dd + mm + yyyy;

    let combo2 = mm + dd + yyyy.substring(2);

    let combo3 = yyyy + mm + dd;

    let combo4 = Number(mm) + dd + yyyy;

    if (isPalindrome(combo1)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (isPalindrome(combo2)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (isPalindrome(combo3)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (isPalindrome(combo4)) {
      return `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function isPalindrome(formate) {
    let length = formate.length;
    for (let i = 0; i < length / 2; i++) {
      if (formate[i] !== formate[length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  function nextDate(date, month, year) {
    let dd1 = Number(date);
    let mm1 = Number(month);
    let yy1 = Number(year);
    let dd2 = Number(date);
    let mm2 = Number(month);
    let yy2 = Number(year);

    for (let i = 1; i > 0; i++) {
      dd1 = dd1 + 1;
      if (dd1 > daysInMonth[mm1 - 1]) {
        dd1 = 1;
        mm1 = mm1 + 1;
        if (mm1 > 12) {
          mm1 = 1;
          yy1 = yy1 + 1;
        }
      }

      let dd1String = dd1.toString();
      let mm1String = mm1.toString();
      let yy1String = yy1.toString();

      if (dd1String.length === 1) {
        dd1String = "0" + dd1String;
      }

      if (mm1String.length === 1) {
        mm1String = "0" + mm1String;
      }

      let flagdata1 = combination(dd1String, mm1String, yy1String);
      if (flagdata1) {
        return [`${flagdata1}`, i];
      }

      if (yy2 > 1) {
        dd2 = dd2 - 1;
        if (dd2 < 1) {
          mm2 = mm2 - 1;
          if (mm2 < 1) {
            mm2 = 12;
            yy2 = yy2 - 1;
            if (yy2 < 1) {
              break;
            }
          }
          dd2 = daysInMonth[mm2 - 1];
        }
      }

      let dd2String = dd2.toString();
      let mm2String = mm2.toString();
      let yy2String = yy2.toString();

      if (dd2String.length === 1) {
        dd2String = "0" + dd2String;
      }

      if (mm2String.length === 1) {
        mm2String = "0" + mm2String;
      }

      let flagdata2 = combination(dd2String, mm2String, yy2String);
      if (flagdata2) {
        return [`${flagdata2}`, i];
      }
    }
  }
  return (
    <div className="App">
      <h1>
        Enter your birthdate and we will tell you if your birthdate is a
        palindrome
      </h1>
      <p>
        This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy,
        mm-dd-yy, m-dd-yyyy e.g.<br></br> if your birthdate is 01 Aug 1995, then
        app will check for 19950801, 01081995, 080195, 1081995
      </p>
      <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
      <div>
        <button className="checkBtn" onClick={checkForPalindrome}>
          see
        </button>
      </div>
      <div>
        {datePalindrome ? (
          <div className="output">
            whoaaaa!! your birthdate in {datePalindrome} formate is lucky!
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {NotPalindrome ? (
          <div className="output">
            Awww! Your birthdate is not palindrome.Nearest palindrome date is{" "}
            {nextPalindrome} You missed it by {difference} days.
          </div>
        ) : (
          ""
        )}
      </div>
      <div>{errorhandler ? <div>please fill the date feild</div> : ""}</div>
      <footer>
        <ul>
          <li className="list-item-inline">
            <a href={"https://github.com/tushargoyal812"}>
              <img alt="" className="git-img" src={gitImg} />
            </a>
          </li>
          <li className="list-item-inline">
            <a href={"https://www.linkedin.com/in/tushargoyal29/"}>
              <img alt="" className="linkedin-img" src={linkedinImg} />
            </a>
          </li>
          <li className="list-item-inline">
            <a href={"https://twitter.com/tushargoyal29"}>
              <img alt="" className="twitter-img" src={twitterImg} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
