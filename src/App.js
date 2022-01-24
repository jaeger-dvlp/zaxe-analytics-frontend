import React, { useState } from 'react'
import images from './images'

import {
  AiFillInstagram,
  AiFillLike,
  AiFillLinkedin,
  AiFillYoutube
} from 'react-icons/ai'

const spinner = (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

function App() {
  const content = [
    {
      img: 'https://stock.setrow.com/pimage/dragandropupload/2252/20220117031901pm02_01.png'
    },
    {
      img: 'https://stock.setrow.com/pimage/dragandropupload/2252/20220117104021am02_03.png'
    },
    {
      img: 'https://stock.setrow.com/pimage/dragandropupload/2252/20220117104027am02_02.png'
    },
    {
      img: 'https://stock.setrow.com/pimage/dragandropupload/2252/20220117104036am02_04-1.png'
    }
  ]

  const [popUp, setPopUp] = useState(false)
  const [voteDate] = useState('5 Ocak 2022')
  const URL = process.env.REACT_APP_ZAXE_REMOTE

  const sendVote = (vote) => {
    fetch(`${URL}/api/setVote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        voteDate: voteDate,
        voteElement: vote,
        voteListLength: content.length
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setPopUp('check')
        } else {
          setPopUp('error')
        }
      })
      .catch((err) => setPopUp('error'))
  }

  return (
    <div
      className="w-full font-pop flex flex-wrap justify-center content-start bg-fixed pt-[5vh] p-0 absolute min-h-screen bg-black text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${images.CenteredWaveGlowBlue})` }}
    >
      <div className="max-w-3xl w-full flex flex-wrap justify-center p-0 m-0 content-start">
        <div
          className={`fixed ${
            popUp === false ? 'invisible opacity-0' : 'visible opacity-100'
          } p-5 flex flex-wrap  justify-center content-center left-0 top-0 bg-black bg-opacity-75 transition-all duration-200 z-40 w-full h-screen`}
        >
          <div className="w-full max-w-[30rem] flex flex-wrap justify-center shadow-xl p-10 bg-zinc-800 rounded-lg text-center text-white">
            <p className="w-full py-10 text-center">
              {popUp === 'loading'
                ? 'Oy gönderiliyor..'
                : popUp === 'check'
                ? 'Oy Gönderildi. Teşekkürler!'
                : popUp === 'error'
                ? 'Bir hata gerçekleşti.'
                : null}
            </p>
            <p className="w-full flex justify-center">
              {popUp === 'loading' ? (
                spinner
              ) : popUp === 'check' ? (
                <button
                  onClick={() => setPopUp(false)}
                  className="text-sm py-2 px-3 bg-sky-400 bg-opacity-25 text-sky-400 rounded-sm hover:bg-opacity-50"
                >
                  Tamam
                </button>
              ) : popUp === 'error' ? (
                <button
                  onClick={() => setPopUp(false)}
                  className="text-sm py-2 px-3 bg-red-400 bg-opacity-25 text-red-400 rounded-sm hover:bg-opacity-50"
                >
                  Tamam
                </button>
              ) : null}
            </p>
          </div>
        </div>
        <div className="container flex flex-wrap justify-center p-0">
          <div className=" w-full flex flex-wrap justify-center">
            <div className="py-16  self-center xl:w-3/4 lg:w-3/4 w-full text-left p-5">
              <h1 className="xl:text-4xl pb-0 lg:text-3xl text-2xl font-semibold text-white">
                Nasıl gözükelim istersiniz?
              </h1>
              <p className="text-white text-[0.8rem]">
                Tasarım yüzü olarak bizi en iyi ifade edeceğini düşündüğünüz
                hangisidir?
              </p>
            </div>
            <div className="py-16 pb-4 flex flex-wrap justify-end xl:mt-auto lg:mt-auto -mt-64 px-5 xl:w-1/4 lg:w-1/4 w-full">
              <img
                src="https://stock.setrow.com/pimage/dragandropupload/2252/20220117105656amUntitled-1.png"
                alt="Zaxe X Shadow"
                className="xl:max-w-full lg:max-w-full max-w-[8rem] w-full"
              />
              <div className="w-full flex xl:justify-center lg:justify-center justify-end pt-2">
                <img
                  src="https://stock.setrow.com/pimage/dragandropupload/2252/20220117104648amlogo.png"
                  alt="zaxe logo white png"
                  className="max-w-[4rem] px-2 w-full"
                />
              </div>
            </div>
          </div>
          <div className="max-w-5xl  grid grid-cols-4 gap-5 justify-center ">
            {content.map((elm, x) => (
              <div className="grid xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-full gap-5 grid-cols-1 justify-center">
                <img
                  className="object-contain shadow-lg rounded-md w-full"
                  src={elm.img}
                  alt={'anket resim'}
                />
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setPopUp('loading')
                      sendVote(x)
                    }}
                    data-imagequery={x}
                    className="p-3 image-like-btn border-2 border-[#009ade] hover:bg-white hover:text-[#009ade] transition-all duration-200 w-full bg-[#009ade] text-center flex justify-center rounded-md text-white"
                  >
                    <AiFillLike className=" self-center text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center content-start py-12">
          <div className="flex w-full p-5 flex-wrap xl:justify-between lg:justify-between justify-center gap-5">
            <h1 className="self-center text-xl xl:text-left lg:text-left text-center  font-medium">
              Sosyal medya hesaplarımızı takip et ve paylaş.
            </h1>
            <a
              href="https://www.youtube.com/c/Zaxe3D"
              target={'_blank'}
              rel="noreferrer"
            >
              <AiFillYoutube className="self-center text-5xl text-white" />
            </a>
          </div>
          <div className="p-5 w-full">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/DF-4ALsBPsY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="p-5 w-full">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/6W2RQfP9XOA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="p-5 w-full">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/uSFaXXhoZm4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="flex w-full p-5 flex-wrap xl:justify-between lg:justify-between justify-center gap-5">
            <h1 className="self-center text-xl xl:text-left lg:text-left text-center  font-medium">
              Sosyal medya hesaplarımızı takip et ve paylaş.
            </h1>
            <a
              href="https://www.instagram.com/zaxe3d/"
              target={'_blank'}
              rel="noreferrer"
            >
              <AiFillInstagram className="self-center text-5xl text-white" />
            </a>
          </div>
          <div className="w-full flex justify-center p-5">
            <blockquote
              className="instagram-media outline-none border-0"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/p/CYJnKsmoyJF/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: '#fff',
                border: '0',
                borderRadius: '3px',
                boxShadow:
                  '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                padding: '0',
                width: '100%'
              }}
            >
              <div style={{ padding: '16px' }}>
                <a
                  href="https://www.instagram.com/reel/CY6yxSluC2j/?utm_source=ig_embed&amp;utm_campaign=loading"
                  style={{
                    background: '$ffffff',
                    lineHeight: '0',
                    padding: '0 0',
                    textAlign: 'center',
                    textDecoration: 'none',
                    width: '100%'
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#f4f4f4',
                        borderRadius: '50%',
                        flexGrow: '0',
                        height: '40px',
                        marginRight: '14px',
                        width: '40px'
                      }}
                    ></div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          borderRadius: '4px',
                          flexGrow: '0',
                          height: '14px',
                          marginBottom: '6px',
                          width: '100px'
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          borderRadius: '4px',
                          flexGrow: '0',
                          height: '14px',
                          width: '60px'
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={{ padding: '19% 0' }}></div>
                  <div
                    style={{
                      display: 'block',
                      height: '50px',
                      margin: '0 auto 12px',
                      width: '50px'
                    }}
                  >
                    <svg
                      width="50px"
                      height="50px"
                      viewBox="0 0 60 60"
                      version="1.1"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-511.000000, -20.000000)"
                          fill="#000000"
                        >
                          <g>
                            <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <div
                      style={{
                        color: '#3897f0',
                        fontFamily: 'Arial,sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normaş',
                        fontWeight: '550',
                        lineHeight: '18px'
                      }}
                    >
                      Bu gönderiyi Instagram&#39;da gör
                    </div>
                  </div>
                  <div style={{ padding: '12.5% 0' }}></div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '14px',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          borderRadius: '50%',
                          height: '12.5px',
                          width: '12.5px',
                          transform: 'translateX(0px) translateY(7px)'
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          height: '12.5px',
                          transform:
                            'rotate(-45deg) translatex(3px) translateY(1px)',
                          width: '12.5px',
                          flexGrow: '0',
                          marginRight: '14px',
                          marginLeft: '2px'
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          borderRadius: '50%',
                          height: '12.5px',
                          width: '12.5px',
                          transform: 'translateX(9px) translateY(-18px)'
                        }}
                      ></div>
                    </div>
                    <div style={{ marginLeft: '8px' }}>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          borderRadius: '50%',
                          flexGrow: '0',
                          height: '20px',
                          width: '20px'
                        }}
                      ></div>
                      <div
                        style={{
                          width: '0',
                          height: '0',
                          borderTop: '2px solid transparent',
                          borderLeft: '6px solid #f4f4f4',
                          borderBottom: '2px solid transparent',
                          transform:
                            'translateX(16px translateY(-4px) rotate(30deg)'
                        }}
                      ></div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <div
                        style={{
                          width: '0px',
                          borderTop: '8px solid #f4f4f4',
                          borderRight: '8px solid transparent',
                          transform: 'translateY(16px)'
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: '#f4f4f4',
                          flexGrow: '0',
                          height: '12px',
                          width: '16px',
                          transform: 'translateY(-4px)'
                        }}
                      ></div>
                      <div
                        style={{
                          width: '0',
                          height: '0',
                          borderTop: '8px solid #f4f4f4',
                          borderLeft: '8px solid transparent',
                          transform: 'translateY(-4px) translateX(8px)'
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: '1',
                      justifyContent: 'center',
                      marginBottom: '24px'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#f4f4f4',
                        borderRadius: '4px',
                        flexGrow: '0',
                        height: '14px',
                        marginBottom: '6px',
                        width: '224px'
                      }}
                    ></div>
                    <div
                      style={{
                        backgroundColor: '#f4f4f4',
                        borderRadius: '4px',
                        flexGrow: '0',
                        height: '14px',
                        width: '144px'
                      }}
                    ></div>
                  </div>
                </a>
                <p
                  style={{
                    color: '#c9c8cd',
                    fontFamily: 'Arial,sans-serif',
                    fontSize: '14px',
                    lineHeight: '17px',
                    marginBottom: '0',
                    marginTop: '8px',
                    overflow: 'hidden',
                    padding: '8px 0 7px',
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <a
                    href="https://www.instagram.com/reel/CY6yxSluC2j/?utm_source=ig_embed&amp;utm_campaign=loading"
                    style={{
                      color: '#c0c8cd',
                      fontFamily: 'Arial,sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      lineHeight: '17px',
                      textDecoration: 'none'
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Zaxe 3D Yazıcı (@zaxe3d)&#39;in paylaştığı bir gönderi
                  </a>
                </p>
              </div>
            </blockquote>
          </div>
          <div className="flex w-full p-5 flex-wrap xl:justify-between lg:justify-between justify-center gap-5">
            <h1 className="self-center text-xl xl:text-left lg:text-left text-center  font-medium">
              Sosyal medya hesaplarımızı takip et ve paylaş.
            </h1>
            <a
              href="https://tr.linkedin.com/company/zaxe"
              target={'_blank'}
              rel="noreferrer"
            >
              <AiFillLinkedin className="self-center text-5xl text-white" />
            </a>
          </div>
          <a
            href="https://tr.linkedin.com/company/zaxe"
            target={'_blank'}
            className="w-full p-5 justify-center flex"
            rel="noreferrer"
          >
            <img
              className="w-full rounded-md object-contain"
              alt="Zaxe Linkedin img"
              src={
                'https://stock.setrow.com/pimage/dragandropupload/2252/20220121032319pmScreen%20Shot%202022-01-21%20at%2015.15.06.png'
              }
            />
          </a>
          <div className="w-full justify-center flex text-center text-sm text-white">
            <a href="https://zaxe.com">www.zaxe.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
