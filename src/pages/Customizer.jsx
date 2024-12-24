import React, {useState,useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import {download, logoShirt, stylishShirt } from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs, FilterTabs,DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation  } from '../config/motion'
import { AiPicker,FilePicker,CustomButton,Tab,ColorPicker } from '../components'



function Customizer() {
 
  
  const snap = useSnapshot(state)

  const [file, setfile] = useState("")
  const [prompt, setprompt] = useState("")
  const [generatingImg, setgeneratingImg] = useState(false)
  const [ActiveEditorTab, setActiveEditorTab] = useState("")
  const [ActiveFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt:false
  })
  const generateContentTab = ()=>{
    switch (ActiveEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
        file={file} 
        setfile={setfile}
        readFile={readFile}/>

      case "aipicker":
        return <AiPicker />

      default:
        return null;
    }

  }
 const handleDecals = (type,result)=>{
   const decalType = DecalTypes[type];
   state[decalType.stateProperty] = result;
    
   if(!ActiveFilterTab[decalType.filterTab]){
    handleActiveFilterTab(decalType.filterTab)
   }
 }

 const handleActiveFilterTab = (tabName)=>{
  switch (tabName) {
   case "logoShirt":
    state.isLogoTexture = !ActiveFilterTab[tabName]
    break;
  case "stylishShirt":
    state.isFullTexture = !ActiveFilterTab[tabName]
    break;
    default:
      state.isLogoTexture = true
      state.isFullTexture = false
      break;
  }

  setActiveFilterTab((prevState) => {
    return {
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })

 }

  const readFile = (file)=>{
     reader(file)
     .then((result) =>{
      handleDecals(type,result);
      setActiveEditorTab("")
     })
  }
  return (
    <AnimatePresence>
     {!snap.intro && (
      <>
      <motion.div className='absolute top-0 left-0 z-10'
      key= "custom"
      {...slideAnimation('left')}>
         <div className='flex items-center min-h-screen'>
          <div className='editortabs-container tabs'>
         {EditorTabs.map((tab)=>(
          <Tab
          key={tab.name}
          tab={tab}
          HandleClick={()=> setActiveEditorTab(tab.name)}
          />
         
         ))}
         {generateContentTab()}
          </div>
         </div>
      </motion.div>

      <motion.div className=' absolute top-5 right-5 z-10'
      {...fadeAnimation}>
          <CustomButton type= "filled"
          title= "Go Back"
          HandleClick={()=> state.intro = true}
          customStyles= "w-fit px-4 py-2.4 font-bold text-sm"
          />
      </motion.div>
      <motion.div className='filtertabs-container' {...slideAnimation('up')}>
      {FilterTabs.map((tab)=>(
          <Tab
          key={tab.name}
          tab={tab}
          isFilterTab
          isActiveTab= ""
          HandleClick= {()=>{}}
          />

         ))}

      </motion.div>
      </>
     )}
    </AnimatePresence>
  )
}

export default Customizer