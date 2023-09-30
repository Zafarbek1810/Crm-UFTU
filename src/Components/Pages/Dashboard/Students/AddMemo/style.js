import styled from "styled-components";

const AddMemoWrapper = styled.div`
  .container {
    width: 890px;
    display: block;
    margin: 0 auto;
  }

  .wrap__content {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
  }

  .wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 4px solid #013870;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 5px;
  }

  .wrap__img {
    width: 200px;
  }
  .wrap__img img {
    width: 100%;
  }
  .wrap__info h1 {
    margin-bottom: 10px;
    font-size: 24px;
  }
  .wrap__contact {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: row;
  }
  .wrap__numbers {
    margin-right: 45px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .wrap__numbers h3 {
    margin-bottom: 5px;
    font-size: 18px;
  }
  .wrap__numbers p {
    margin-bottom: 5px;
  }
  .wrap__web {
    margin-top: -3px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .wrap__web span i {
    margin-bottom: 0px;
    margin-right: 5px;
    font-size: 20px;
  }
  .wrap__social {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .wrap__social h3 {
    margin-bottom: 3px;
    font-size: 18px;
  }
  .wrap__social p {
    margin-bottom: 3px;
  }
  .wrap-text__desc {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }
  .wrap-text__title {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
  }
  .wrap-text__title .name {
    margin-right: 5px;
    font-weight: 500;
  }
  .wrap-text__auth {
    border-bottom: 1px solid #272727;
    margin-right: 15px;
    margin-left: 10px;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .wrap-text__date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
  }
  .wrap-text__date .date {
    margin-right: 5px;
    font-weight: 500;
  }
  .wrap-text__date .date-num {
    border-bottom: 1px solid #272727;
    margin-right: 10px;
  }
  .wrap-text__form {
    width: 100%;
    margin: 5px 0;
  }
  .wrap-text__form h3 {
    margin-bottom: 5px;
    font-weight: normal;
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .item input{
    background-color: #fff;
  }
  .wrap-text__get {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrap-text__get-doc {
    margin-top: 20px;
    width: 70%;
  }
  .wrap-text__get-doc h3 {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 600;
  }

  .wrap-text__get-doc p {
    font-size: 12px;
    display: inline !important;
    margin-left: 40%;
  }
  .wrap-text__get-sign {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .wrap-text__get-sign div {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #272727;
  }
  .wrap-text__get-doc div {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #272727;
  }
  .wrap-text__get-sign p {
    font-size: 12px;
  }
  .wrap-text__get {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .wrap-text__get-doc {
    width: 70%;
  }
  .wrap-text__get-doc h3 {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    white-space: nowrap;
  }
`;

export default AddMemoWrapper;
