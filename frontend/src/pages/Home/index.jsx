import React, { useState, useEffect } from 'react'
import DirContent from '../../container/DirContent'
import { connect } from 'react-redux'

import { change } from '../../redux/action/dirContent'
import request from '../../api'
import './index.less'

function Home(props) {
  const userAvatarPath = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F11%2F20190111173500_NNvRG.thumb.400_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661655692&t=19ce020b9b4e59a381a71e0db371095e'
  const username = 'Anime Cat'


  const [itemIndex, setItemIndex] = useState(0)
  const [bottomIsOpen, setBottomIsOpen] = useState(false)
  const [asideIsOpen, setAsideIsOpen] = useState(false)
  let [modules, setModules] = useState([])

  const Item_focus = index => setItemIndex(index)

  const getDir = async () => {
    let response = await request({ url: `/AnimeCat/` })
    // return response.data
    console.log(response);
    console.log("Dir", response.data.cat);
    setModules(response.data.cat.dirChild)

    getData()
  }


  const getData = (id) => {

    const getFile = async () => {
      let response = await request({ url: `/AnimeCatID?id=${id}` })
      return response.data
    }

    let files = getFile()
    files.then(val => {
      // console.log("File", val)
      props.change({ dirList: val.dirChild, fileList: val.objChild })
    })
  }

  const changeDirContent = (index, id) => {
    Item_focus(index)
    getData(id)
  }


  useEffect(() => {
    getDir()
  }, [])

  return (
    <div id="home">
      <aside className='animate__fadeInLeft animate__animated'>
        <div className="aside_top">
          <div className="avatarBox">
            <div className="avatarImg">
              <img src={userAvatarPath} alt="" />
            </div>
            <div className="username">
              <span>{username}</span>
            </div>
          </div>
        </div>
        <nav >
          {modules.map((i, index) => {
            return (
              <div className={`animate__fadeInLeft animate__animated 
              ${itemIndex === index ? "navItem navItem_focus" : "navItem"}`}
                onClick={() => {
                  changeDirContent(index, i._id)
                }}
                key={i._id}>
                <span>{i.name}</span>
              </div>
            )
          })}
        </nav>
        <div className="aside_bottom">
          <div className="setting">
            <svg t="1659080870475" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3847" width="20" height="20"><path d="M1016.832 606.208q2.048 12.288-1.024 29.696t-10.24 35.328-17.408 32.256-22.528 20.48-21.504 6.144-20.48-4.096q-10.24-3.072-25.6-5.632t-31.232-1.024-31.744 6.656-27.136 17.408q-24.576 25.6-28.672 58.368t9.216 62.464q10.24 20.48-3.072 40.96-6.144 8.192-19.456 16.896t-29.184 15.872-33.28 11.264-30.72 4.096q-9.216 0-17.408-7.168t-11.264-15.36l-1.024 0q-11.264-31.744-38.4-54.784t-62.976-23.04q-34.816 0-62.976 23.04t-39.424 53.76q-5.12 12.288-15.36 17.92t-22.528 5.632q-14.336 0-32.256-5.12t-35.84-12.8-32.256-17.92-21.504-20.48q-5.12-7.168-5.632-16.896t7.68-27.136q11.264-23.552 8.704-53.76t-26.112-55.808q-14.336-15.36-34.816-19.968t-38.912-3.584q-21.504 1.024-44.032 8.192-14.336 4.096-28.672-2.048-11.264-4.096-20.992-18.944t-17.408-32.768-11.776-36.864-2.048-31.232q3.072-22.528 20.48-28.672 30.72-12.288 55.296-40.448t24.576-62.976q0-35.84-24.576-62.464t-55.296-38.912q-9.216-3.072-15.36-14.848t-6.144-24.064q0-13.312 4.096-29.696t10.752-31.744 15.36-28.16 18.944-18.944q8.192-5.12 15.872-4.096t16.896 4.096q30.72 12.288 64 7.68t58.88-29.184q12.288-12.288 17.92-30.208t7.168-35.328 0-31.744-2.56-20.48q-2.048-6.144-3.584-14.336t1.536-14.336q6.144-14.336 22.016-25.088t34.304-17.92 35.84-10.752 27.648-3.584q13.312 0 20.992 8.704t10.752 17.92q11.264 27.648 36.864 48.64t60.416 20.992q35.84 0 63.488-19.968t38.912-50.688q4.096-8.192 12.8-16.896t17.92-8.704q14.336 0 31.232 4.096t33.28 11.264 30.208 18.432 22.016 24.576q5.12 8.192 3.072 17.92t-4.096 13.824q-13.312 29.696-8.192 62.464t29.696 57.344 60.416 27.136 66.56-11.776q8.192-5.12 19.968-4.096t19.968 9.216q15.36 14.336 27.136 43.52t15.872 58.88q2.048 17.408-5.632 27.136t-15.872 12.8q-31.744 11.264-54.272 39.424t-22.528 64q0 34.816 18.944 60.928t49.664 37.376q7.168 4.096 12.288 8.192 11.264 9.216 15.36 23.552zM540.672 698.368q46.08 0 87.04-17.408t71.168-48.128 47.616-71.168 17.408-86.528-17.408-86.528-47.616-70.656-71.168-47.616-87.04-17.408-86.528 17.408-70.656 47.616-47.616 70.656-17.408 86.528 17.408 86.528 47.616 71.168 70.656 48.128 86.528 17.408z" p-id="3848" fill="#ffffff"></path></svg>
            <span>Settings</span>
          </div>
          <div className="addTag" title="添加标签">
            <svg t="1659599674203" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3019" width="20" height="20"><path d="M915.746268 0h-807.911811C48.273134 0 0 48.482772 0 107.834457v807.911811c0 59.561323 48.482772 107.834457 107.834457 107.834456h807.911811c59.561323 0 107.834457-48.482772 107.834456-107.834456v-807.911811c0-59.343622-48.482772-107.834457-107.834456-107.834457z m56.634456 915.746268c0 31.139276-25.495181 56.634457-56.634456 56.634456h-807.911811c-31.139276 0-56.634457-25.495181-56.634457-56.634456v-807.911811c0-31.139276 25.495181-56.634457 56.634457-56.634457h807.911811c31.139276 0 56.634457 25.495181 56.634456 56.634457v807.911811z m-267.288189-429.451087H537.293606V318.488189a25.688693 25.688693 0 0 0-25.704819-25.704819A25.688693 25.688693 0 0 0 485.875906 318.488189v167.806992H318.068913c-14.215055 0-25.704819 11.497827-25.704819 25.495181a25.688693 25.688693 0 0 0 25.704819 25.704819H485.875906v167.806992a25.688693 25.688693 0 0 0 25.704818 25.704819 25.688693 25.688693 0 0 0 25.704819-25.704819V537.495181H705.108661a25.688693 25.688693 0 0 0 25.704819-25.704819c0-14.206992-11.497827-25.495181-25.704819-25.495181z" fill="#ffffff" p-id="3020"></path></svg>
          </div>
        </div>
      </aside>
      <main className="animate__fadeIn animate__animated">
        <div className="main_top">
          <div className="searchBox">
            <input type="text" name="" id="" placeholder='Search Files or Images or Videos . . .' />
          </div>
        </div>
        <div className="main_center">
          <DirContent getData={getData} rootDir={modules[itemIndex]} />
        </div>
        <div className="main_bottom" style={{
          height: bottomIsOpen ? '80px' : '0px'
        }}>
          <div className="switch" onClick={() => setBottomIsOpen(!bottomIsOpen)}>
            <svg style={{
              transform: bottomIsOpen ? 'rotate(0deg)' : 'rotate(180deg)'
            }} t="1659602203608" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8128" width="16" height="16"><path d="M957.44 193.536c0-70.144-56.832-126.976-126.976-126.976H193.536C123.392 66.56 66.56 123.392 66.56 193.536v636.416c0 70.144 56.832 126.976 126.976 126.976h636.416c70.144 0 126.976-56.832 126.976-126.976V193.536z m-61.44 638.976c0 35.328-28.672 63.488-63.488 63.488H196.608c-35.328 0-63.488-28.672-63.488-63.488V196.608C133.12 161.792 161.792 133.12 196.608 133.12h635.904c35.328 0 63.488 28.672 63.488 63.488v635.904z" p-id="8129" fill="#ffffff"></path><path d="M316.928 392.192l223.232 223.232c12.288 12.288 12.288 32.256 0 44.544-12.288 12.288-32.256 12.288-44.544 0L272.384 436.736c-12.288-12.288-12.288-32.256 0-44.544 12.288-12.288 32.256-12.288 44.544 0z" p-id="8130" fill="#ffffff"></path><path d="M762.88 392.192c12.288 12.288 12.288 32.256 0 44.544l-223.232 223.232c-12.288 12.288-32.256 12.288-44.544 0-12.288-12.288-12.288-32.256 0-44.544l223.232-223.232c12.288-12.288 32.256-12.288 44.544 0z" p-id="8131" fill="#ffffff"></path></svg>
            <span>{bottomIsOpen ? 'close' : 'open'}</span>
          </div>
        </div>
        <div className="main_aside" style={{
          width: asideIsOpen ? '140px' : '0px'
        }}>
          <div className="switch" onClick={() => setAsideIsOpen(!asideIsOpen)}>
            <svg style={{
              transform: asideIsOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
            }} t="1659602203608" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8128" width="16" height="16"><path d="M957.44 193.536c0-70.144-56.832-126.976-126.976-126.976H193.536C123.392 66.56 66.56 123.392 66.56 193.536v636.416c0 70.144 56.832 126.976 126.976 126.976h636.416c70.144 0 126.976-56.832 126.976-126.976V193.536z m-61.44 638.976c0 35.328-28.672 63.488-63.488 63.488H196.608c-35.328 0-63.488-28.672-63.488-63.488V196.608C133.12 161.792 161.792 133.12 196.608 133.12h635.904c35.328 0 63.488 28.672 63.488 63.488v635.904z" p-id="8129" fill="#ffffff"></path><path d="M316.928 392.192l223.232 223.232c12.288 12.288 12.288 32.256 0 44.544-12.288 12.288-32.256 12.288-44.544 0L272.384 436.736c-12.288-12.288-12.288-32.256 0-44.544 12.288-12.288 32.256-12.288 44.544 0z" p-id="8130" fill="#ffffff"></path><path d="M762.88 392.192c12.288 12.288 12.288 32.256 0 44.544l-223.232 223.232c-12.288 12.288-32.256 12.288-44.544 0-12.288-12.288-12.288-32.256 0-44.544l223.232-223.232c12.288-12.288 32.256-12.288 44.544 0z" p-id="8131" fill="#ffffff"></path></svg>
            <span>{asideIsOpen ? 'close' : 'open'}</span>
          </div>
        </div>
      </main>
    </div>
  )
}

// 暴露容器
export default connect(
  // 映射状态
  state => ({ dirContent: state.dirContent }),
  { change }
)(Home)



