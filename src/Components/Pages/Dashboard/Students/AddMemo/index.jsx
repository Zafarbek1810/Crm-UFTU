import React, { useEffect, useState } from "react";
import StudentProvider from "../../../../../Data/StudentProvider";
import AddMemoWrapper from "./style";

const AddMemo = ({ id }) => {
  const [student, setStudent] = useState({});
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  useEffect(() => {
    StudentProvider.getOneStudent(id)
      .then((res) => {
        setStudent(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <AddMemoWrapper>
      <div className="wrap" style={{marginTop:"25px"}}>
        <div className="container">
          <div className="wrap__content">
            <div className="wrap-title">
              <div className="wrap__img">
                <img
                  src="https://crm2022.rosuniversitet.com/images/logo.png"
                  alt="Rosuniversitet"
                />
              </div>
              <div className="wrap__info">
                <h1>УФА Фан ва Технологиялар Университети</h1>

                <div className="wrap__contact">
                  <div className="wrap__numbers">
                    <h3>Контактлар</h3>
                    <p>
                      <b>Тел:</b> <span>: +998(91) 435-00-10</span>
                    </p>
                    <p>
                      <b>Сайт:</b> <span>www.uftu.uz</span>
                    </p>
                    <p>
                      <b>E-mail:</b> <span>admin@uftu.uz</span>
                    </p>
                  </div>
                  <div className="wrap__social">
                    <h3>Ижтимоий тармоқлар</h3>
                    <p>Телеграм: t.me/rosuniversitet</p>
                    <p>Инстаграм: instagram.com/rosuniversitet</p>
                    <p>Facebook: fb.com/rosuniversitet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap-text">
              <center>
                <h2 style={{ margin: 0 }}>
                  ҚАБУЛ ҚИЛГАН ҲУЖЖАТЛАР РЎЙХАТИ № <span>{id}</span>
                </h2>
              </center>
              <div className="wrap-text__desc">
                <div className="wrap-text__title">
                  <span className="name">
                    Ф. И. Ш:
                    <span className="wrap-text__auth">
                      {student.first_name} {student.last_name}{" "}
                      {student.middle_name}
                    </span>
                  </span>
                  <div className="wrap-text__date">
                    <span className="date">Сана:</span>
                    <span className="date-num">{currentDate} </span>
                  </div>
                </div>
                <div className="wrap-text__form">
                  <h3>Қабул қилинган ҳужжатлар рўйҳати:</h3>
                  <form>
                    <div className="item">
                      <input type="checkbox" id="document" />
                      <label for="document">Ариза</label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document2" />
                      <label for="document2">
                        Олдинги таълим тўғрисидаги ҳужжат (сертификат/диплом){" "}
                        {student.certificate_number}
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document3" checked="" />
                      <label for="document2">
                        Нусхалар (сертификат/диплом/паспорт).
                      </label>
                    </div>

                    <div className="item">
                      <input type="checkbox" id="document4" checked="" />
                      <label for="document4">Расмлар ___ дона.</label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document5" />
                      <label for="document5">
                        Тиббий маълумотномалар (№ 86/сертификатлар)
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document6" />
                      <label for="document6">
                        Таълим ҳужжатларини экспертизадан ўтказиш.
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document7" />
                      <label for="document7">
                        Бошқа ҳужжатлар:
                        _________________________________________
                      </label>
                    </div>
                  </form>
                </div>
                <div className="wrap-text__get">
                  <div className="wrap-text__get-doc">
                    <h3>
                      Ҳужжатларни қабул қилди:
                      <div></div>
                    </h3>
                  </div>
                  <div className="wrap-text__get-sign">
                    <div></div>
                  </div>
                </div>
                <div className="wrap-text__get">
                  <div className="wrap-text__get-doc">
                    <h3>
                      Шахсий маълумотларга <br />
                      ишлов беришга розилик:
                      <div></div>
                    </h3>
                  </div>
                  <div className="wrap-text__get-sign">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "2px dashed grey", margin: "25px 0" }}></div>
      <div className="wrap">
        <div className="container">
          <div className="wrap__content">
            <div className="wrap-title">
              <div className="wrap__img">
                <img
                  src="https://crm2022.rosuniversitet.com/images/logo.png"
                  alt="Rosuniversitet"
                />
              </div>
              <div className="wrap__info">
                <h1>УФА Фан ва Технологиялар Университети</h1>

                <div className="wrap__contact">
                  <div className="wrap__numbers">
                    <h3>Контактлар</h3>
                    <p>
                      <b>Тел:</b> <span>: +998(91) 435-00-10</span>
                    </p>
                    <p>
                      <b>Сайт:</b> <span>www.uftu.uz</span>
                    </p>
                    <p>
                      <b>E-mail:</b> <span>admin@uftu.uz</span>
                    </p>
                  </div>
                  <div className="wrap__social">
                    <h3>Ижтимоий тармоқлар</h3>
                    <p>Телеграм: t.me/rosuniversitet</p>
                    <p>Инстаграм: instagram.com/rosuniversitet</p>
                    <p>Facebook: fb.com/rosuniversitet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap-text">
              <center>
                <h2 style={{ margin: 0 }}>
                Абитурийент эслатмаси № <span>{id}</span>
                </h2>
              </center>
              <div className="wrap-text__desc">
                <div className="wrap-text__title">
                  <span className="name">
                    Ф. И. Ш:
                    <span className="wrap-text__auth">
                      {student.first_name} {student.last_name}{" "}
                      {student.middle_name}
                    </span>
                  </span>
                  <div className="wrap-text__date">
                    <span className="date">Сана:</span>
                    <span className="date-num">{currentDate} </span>
                  </div>
                </div>
                <div className="wrap-text__form">
                  <h3>Қабул қилинган ҳужжатлар рўйҳати:</h3>
                  <form>
                    <div className="item">
                      <input type="checkbox" id="document" />
                      <label for="document">Ариза</label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document2" />
                      <label for="document2">
                        Олдинги таълим тўғрисидаги ҳужжат (сертификат/диплом){" "}
                        {student.certificate_number}
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document3" checked="" />
                      <label for="document2">
                        Нусхалар (сертификат/диплом/паспорт).
                      </label>
                    </div>

                    <div className="item">
                      <input type="checkbox" id="document4" checked="" />
                      <label for="document4">Расмлар ___ дона.</label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document5" />
                      <label for="document5">
                        Тиббий маълумотномалар (№ 86/сертификатлар)
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document6" />
                      <label for="document6">
                        Таълим ҳужжатларини экспертизадан ўтказиш.
                      </label>
                    </div>
                    <div className="item">
                      <input type="checkbox" id="document7" />
                      <label for="document7">
                        Бошқа ҳужжатлар:
                        _________________________________________
                      </label>
                    </div>
                  </form>
                </div>
                <div className="wrap-text__get">
                  <div className="wrap-text__get-doc">
                    <h3>
                      Ҳужжатларни қабул қилди:
                      <div></div>
                    </h3>
                  </div>
                  <div className="wrap-text__get-sign">
                    <div></div>
                  </div>
                </div>
                <div className="wrap-text__get">
                  <div className="wrap-text__get-doc">
                    <h3>
                      Шахсий маълумотларга <br />
                      ишлов беришга розилик:
                      <div></div>
                    </h3>
                  </div>
                  <div className="wrap-text__get-sign">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AddMemoWrapper>
  );
};

export default AddMemo;
