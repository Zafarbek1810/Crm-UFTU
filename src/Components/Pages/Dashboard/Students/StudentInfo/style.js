import { styled } from "styled-components";

const StudentInfoWrapper= styled.div`
.content{
    display: flex;
  gap: 50px;
    .images{
      width: 50%;

      .imgs{
        display: flex;
        gap: 10px;
      }
      img{
        width: 100px;
        height: 100px;
      }
    }
  }
.table{
    width: 50%;
    margin-top: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.03);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: rgb(20 21 33 / 18%) 0px 2px 10px 0px; */

      tr{
        display: flex;
        /* background: #006786; */
        /* border-radius: 6px 6px 0px 0px; */
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);
        
        th{
          width: 30%;
          font-style: normal;
          font-weight:500;
          font-size: 16px;
          line-height: 24px;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 20px;
          border-bottom: none;

        }
      }

      tr{
        display: flex;
          align-items: center;
        td {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 0.7);
          text-align: center;
          font-family: "Azo sans";
          cursor: pointer;
          border-bottom: none;
          padding: 15px 12px 10px 20px;
        }

    }
  }

  
`

export default StudentInfoWrapper;