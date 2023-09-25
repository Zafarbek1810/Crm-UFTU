import { styled } from "styled-components";

const AddStudentWrapper = styled.div`
.top{
  display: flex;

  button{
    background: transparent;
    border: none;
  }
}

    form {
    background: #fff;
    font-family: "Inter";
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .label {
      width: 30%;
      display: block;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      font-family: Azo sans;

      span.label-text {
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 18px;
        color: #000000;
        margin-bottom: 8px;
      }

      input {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 10px 10px;
        background: #fff;
      }

      span.err-text {
        color: red !important;
        position: absolute;
        left: 0;
        top: 70px;
      }

      .select {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        color: #000000;
        font-family: Azo sans;

      }
    }

      button {
        width: 100%;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 18px;
        border-radius: 4px;
        padding: 12px 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Azo sans;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
  }

`


export {
    AddStudentWrapper,
}