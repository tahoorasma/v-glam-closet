import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import defaultModel from '../images/models/model1.png';
import cmp from '../images/compare.jpg'
import buy from '../images/blush.jpg'
import s_es from '../images/eyeshadows/single.png'
import hw_es from '../images/eyeshadows/hardwired.png'
import gs_es from '../images/eyeshadows/glowshots.png'
import cb_es from '../images/eyeshadows/candy-berry.png'
import vk_es from '../images/eyeshadows/violet-knit.png'
import bs_es from '../images/eyeshadows/berry-smoothie.png'
import vj_es from '../images/eyeshadows/vintage-jean.png'
import ag_es from '../images/eyeshadows/afterglow.png'
import in_es from '../images/eyeshadows/icy-nude.png'
import uu_es from '../images/eyeshadows/ultimate-utopia.png'
import ns from '../images/eyeshadows/night-star.png'
import gq from '../images/eyeshadows/guayaquil.png'
import ss from '../images/eyeshadows/glowshots/strawberry-stacked.png'
import gf from '../images/eyeshadows/glowshots/grapefruit.png'
import fg from '../images/eyeshadows/glowshots/feeling-grape.png'
import rr from '../images/eyeshadows/glowshots/raspberry-rave.png'
import bb from '../images/eyeshadows/glowshots/blueberry-bank.png'
import ww from '../images/eyeshadows/glowshots/watermelon-wealth.png'
import bl from '../images/eyeshadows/glowshots/blueberry-baller.png'
import cc from '../images/eyeshadows/glowshots/coconut.png'
import kk from '../images/eyeshadows/glowshots/kiwi-killa.png'
import ls from '../images/eyeshadows/glowshots/lemon-slayed.png'
import pr from '../images/eyeshadows/glowshots/pear-prize.png'
import pp from '../images/eyeshadows/glowshots/plum-player.png'
import mr from '../images/eyeshadows/hardwired/melrose.png'
import pt from '../images/eyeshadows/hardwired/pattaya.png'
import mz from '../images/eyeshadows/hardwired/mendoza.png'
import fr from '../images/eyeshadows/hardwired/firenze.png'
import md from '../images/eyeshadows/hardwired/madrid.png'
import es from '../images/eyeshadows/hardwired/earthshine.png'
import ch from '../images/eyeshadows/hardwired/chile.png'
import ri from '../images/eyeshadows/hardwired/rio.png'
import cb_bb from '../images/eyeshadows/candyberry/berry-banana.png'
import cb_cc from '../images/eyeshadows/candyberry/cherry-chips.png'
import cb_cbc from '../images/eyeshadows/candyberry/choco-berrycake.png'
import cb_ps from '../images/eyeshadows/candyberry/pink-star.png'
import cb_scc from '../images/eyeshadows/candyberry/strawberry-cheesecake.png'
import cb_s from '../images/eyeshadows/candyberry/strawberry.png'
import cb_wb from '../images/eyeshadows/candyberry/whipping-berry.png'
import vk_hs from '../images/eyeshadows/violetknit/heather-spangle.png'
import vk_cc from '../images/eyeshadows/violetknit/cashmere-coat.png'
import vk_pt from '../images/eyeshadows/violetknit/pink-tweed.png'
import vk_vc from '../images/eyeshadows/violetknit/violet-check.png'
import vk_lc from '../images/eyeshadows/violetknit/lavender-cotton.png'
import vk_sa from '../images/eyeshadows/violetknit/silky-alpaca.png'
import bs_bc from '../images/eyeshadows/berrysmoothie/berry-chip.png'
import bs_b from '../images/eyeshadows/berrysmoothie/blush.png'
import bs_cc from '../images/eyeshadows/berrysmoothie/cherry-cooler.png'
import bs_f from '../images/eyeshadows/berrysmoothie/fog.png'
import bs_fr from '../images/eyeshadows/berrysmoothie/frozen.png'
import bs_fb from '../images/eyeshadows/berrysmoothie/fudgy-berry.png'
import bs_mv from '../images/eyeshadows/berrysmoothie/mauve-beam.png'
import bs_ps from '../images/eyeshadows/berrysmoothie/pink-salt.png'
import bs_s from '../images/eyeshadows/berrysmoothie/slush.png'
import bs_sd from '../images/eyeshadows/berrysmoothie/soda.png'
import bs_sw from '../images/eyeshadows/berrysmoothie/sweet.png'
import vj01 from '../images/eyeshadows/vintagejean/vj01.png'
import vj05 from '../images/eyeshadows/vintagejean/vj05.png'
import vj08 from '../images/eyeshadows/vintagejean/vj08.png'
import vj10 from '../images/eyeshadows/vintagejean/vj10.png'
import vj13 from '../images/eyeshadows/vintagejean/vj13.png'
import vj14 from '../images/eyeshadows/vintagejean/vj14.png'
import ag_ad from '../images/eyeshadows/afterglow/adoration.png'
import ag_am from '../images/eyeshadows/afterglow/amorous.png'
import ag_bl from '../images/eyeshadows/afterglow/blaze.png'
import ag_fr from '../images/eyeshadows/afterglow/frisky.png'
import ag_hs from '../images/eyeshadows/afterglow/high-stakes.png'
import ag_hr from '../images/eyeshadows/afterglow/hot-rod.png'
import ag_ni from '../images/eyeshadows/afterglow/nitro.png'
import ag_pb from '../images/eyeshadows/afterglow/pure-bliss.png'
import in_ar from '../images/eyeshadows/icynude/aurora.png'
import in_bl from '../images/eyeshadows/icynude/bling.png'
import in_dd from '../images/eyeshadows/icynude/diamond-dew.png'
import in_gs from '../images/eyeshadows/icynude/gold-standard.png'
import in_io from '../images/eyeshadows/icynude/iced-out.png'
import in_pl from '../images/eyeshadows/icynude/platinum.png'
import in_vvs from '../images/eyeshadows/icynude/vvs.png'
import uu02 from '../images/eyeshadows/ultimateutopia/uu02.png'
import uu06 from '../images/eyeshadows/ultimateutopia/uu06.png'
import uu09 from '../images/eyeshadows/ultimateutopia/uu09.png'
import uu11 from '../images/eyeshadows/ultimateutopia/uu11.png'
import uu13 from '../images/eyeshadows/ultimateutopia/uu13.png'
import uu16 from '../images/eyeshadows/ultimateutopia/uu16.png'
import uu18 from '../images/eyeshadows/ultimateutopia/uu18.png'
import uu20 from '../images/eyeshadows/ultimateutopia/uu20.png'
import uu21 from '../images/eyeshadows/ultimateutopia/uu21.png'
import uu23 from '../images/eyeshadows/ultimateutopia/uu23.png'
import uu26 from '../images/eyeshadows/ultimateutopia/uu26.png'
import uu31 from '../images/eyeshadows/ultimateutopia/uu31.png'
import uu36 from '../images/eyeshadows/ultimateutopia/uu36.png'
import uu37 from '../images/eyeshadows/ultimateutopia/uu37.png'
import uu38 from '../images/eyeshadows/ultimateutopia/uu38.png'
import uu40 from '../images/eyeshadows/ultimateutopia/uu40.png'
import Navbar from '../navbar';

const VirtualTryOnLive = () => {
  const [videoSrc, setVideoSrc] = useState('http://localhost:5000/video_feed');
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [showFoundationProducts, setShowFoundationProducts] = useState(false);
  const [showLipstickProducts, setShowLipstickProducts] = useState(false);
  const [showBlushProducts, setShowBlushProducts] = useState(false);
  const [showEyeShadowProducts, setShowEyeShadowProducts] = useState(false);
  const [showSingleEyeShadow, setShowSingleEyeShadow] = useState(false);
  const [showHardwiredEyeShadow, setShowHardwiredEyeShadow] = useState(false);
  const [showGlowshotEyeShadow, setShowGlowshotEyeShadow] = useState(false);
  const [showCandyBerryEyeShadow, setShowCandyBerryEyeShadow] = useState(false);
  const [showVioletKnitEyeShadow, setShowVioletKnitEyeShadow] = useState(false);
  const [showBerrySmoothieEyeShadow, setShowBerrySmoothieEyeShadow] = useState(false);
  const [showVintageJeanEyeShadow, setShowVintageJeanEyeShadow] = useState(false);
  const [showAfterglowEyeShadow, setShowAfterglowEyeShadow] = useState(false);
  const [showIcyNudeEyeShadow, setShowIcyNudeEyeShadow] = useState(false);
  const [showUltimateUtopiaEyeShadow, setShowUltimateUtopiaEyeShadow] = useState(false);
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [selectedBlush, setSelectedBlush] = useState(null);
  const [selectedLipstick, setSelectedLipstick] = useState(null);
  const [selectedEyeShadow, setSelectedEyeShadow] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVideoSrc(`http://localhost:5000/video_feed?timestamp=${new Date().getTime()}`);
    }, 100); 
    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    } else if (location.state?.selectedModel) {
      try {
        console.log('Selected Model:', location.state.selectedModel);
        setImageSource(require(`../images/${location.state.selectedModel}`));
      } catch (error) {
        console.error('Error loading image:', error);
        setImageSource(defaultModel); 
      }
    } else if (location.state?.uploadPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSource(e.target.result);
      reader.readAsDataURL(location.state.uploadPhoto);
    }
  }, [location.state]);  

  const handleBack = async () => {
    resetFoundation();
    /*resetLipstick();
    resetBlush();
    resetEyeshadow();*/
    setShowFoundationProducts(false);
    setShowLipstickProducts(false);
    setShowBlushProducts(false);
    setShowEyeShadowProducts(false);
  }
  const handleEyeshadowBack = async () => {
    setShowSingleEyeShadow(false);
    setShowHardwiredEyeShadow(false);
    setShowGlowshotEyeShadow(false);
    setShowCandyBerryEyeShadow(false);
    setShowVioletKnitEyeShadow(false);
    setShowBerrySmoothieEyeShadow(false);
    setShowVintageJeanEyeShadow(false);
    setShowAfterglowEyeShadow(false);
    setShowIcyNudeEyeShadow(false);
    setShowUltimateUtopiaEyeShadow(false);
  }
  const handleFoundationBtnClick = async () => {
    setShowFoundationProducts(true);
  }
  const handleLipstickBtnClick = async () => {
    setShowLipstickProducts(true);
  }
  const handleBlushBtnClick = async () => {
    setShowBlushProducts(true);
  }
  const handleEyeShadowBtnClick = async () => {
    setShowEyeShadowProducts(true);
  }
  const handleSingleESBtnClick = async () => {
    setShowSingleEyeShadow(true);
  }
  const handleHardwiredESBtnClick = async () => {
    setShowHardwiredEyeShadow(true);
  }
  const handleGlowshotESBtnClick = async () => {
    setShowGlowshotEyeShadow(true);
  }
  const handleCandyBerryESBtnClick = async () => {
    setShowCandyBerryEyeShadow(true);
  }
  const handleVioletKnitESBtnClick = async () => {
    setShowVioletKnitEyeShadow(true);
  }
  const handleBerrySmoothieESBtnClick = async () => {
    setShowBerrySmoothieEyeShadow(true);
  }
  const handleVintageJeanESBtnClick = async () => {
    setShowVintageJeanEyeShadow(true);
  }
  const handleAfterglowESBtnClick = async () => {
    setShowAfterglowEyeShadow(true);
  }
  const handleIcyNudeESBtnClick = async () => {
    setShowIcyNudeEyeShadow(true);
  }
  const handleUltimateUtopiaESBtnClick = async () => {
    setShowUltimateUtopiaEyeShadow(true);
  }

  const handleFoundationClick = (shadeColor) => {
    setSelectedFoundation(shadeColor);
    fetch('http://localhost:5000/select-foundation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shadeColor }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error in handleFoundationClick:", error));
  };
  
  const handleLipstickClick = (lipstickId) => {
    setSelectedLipstick(lipstickId);
    fetch('http://localhost:5000/select-lipstick', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: lipstickId.toString() }), 
    })
      .then(response => response.json())
      .then(data => console.log("Lipstick selection response:", data))
      .catch(error => console.error("Error in handleLipstickClick:", error));
  };
  
  const handleBlushClick = (blushId) => {
    setSelectedBlush(blushId);
    fetch('http://localhost:5000/select-blush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: blushId.toString() }), 
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error in handleBlushClick:", error));
  };

  const handleEyeShadowClick = (shadeColor, isGlitter) => {
    setSelectedEyeShadow(shadeColor);
    fetch('http://localhost:5000/select-eyeshadow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shadeColor, isGlitter}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error in handleEyeShadowClick:", error));
  };  

  const resetFoundation = () => {
    fetch('http://localhost:5000/reset-foundation', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetLipstick = () => {
    fetch('http://localhost:5000/reset-lipstick', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetBlush = () => {
    fetch('http://localhost:5000/reset-blush', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };const resetEyeshadow = () => {
    fetch('http://localhost:5000/reset-eyeshadow', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error in reset:", error));
  };
  
  const handleAccessoryBtnClick = () => {
    resetFoundation();
    /*resetLipstick();
    resetBlush();
    resetEyeshadow();*/
    navigate('/virtual-try-on-accessory-live', { state: { imageSource }});
  };

  return (
    <div>
      <div className="header">V-Glam Closet</div>
      <Navbar />

      <div className="virtual-tryon-container">
        <h3><b>VIRTUAL TRY-ON</b></h3>
        <p>Time to make up your mind! Experience your perfect makeup shades or try a bold new look with our virtual try-on tool.</p>

        <div className="tryon-ui">
          <div className="photo-area">
            <div className="model-container">
              <img src={videoSrc} alt="Video Stream" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>

          <div className="col-12 col-md-2">
            <div className="button-container">
              {(showFoundationProducts || showBlushProducts || showLipstickProducts || showEyeShadowProducts) && (
                <>
                  <button id="side-btn">
                    <img src={cmp} alt="Compare" className="button-icon" />
                    <span>Compare</span>
                  </button>
                  <button id="side-btn">
                    <img src={buy} alt="Buy" className="button-icon" />
                    <span>Buy</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="controls">
            { showFoundationProducts ? (
              //foundation from NYX
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetFoundation}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fed4b1')} title='Pale' style={{ background: '#fed4b1', border: selectedFoundation === '#fed4b1' ? '2px solid rgb(100, 99, 99)' : '2px solid #fed4b1' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fccab7')} title='Light Porcelain' style={{ background: '#fccab7', border: selectedFoundation === '#fccab7' ? '2px solid rgb(100, 99, 99)' : '2px solid #fccab7' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ecc4a9')} title='Light Ivory' style={{ background: '#ecc4a9', border: selectedFoundation === '#ecc4a9' ? '2px solid rgb(100, 99, 99)' : '2px solid #ecc4a9' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e3b69a')} title='Light' style={{ background: '#e3b69a', border: selectedFoundation === '#e3b69a' ? '2px solid rgb(100, 99, 99)' : '2px solid #e3b69a' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e0c5ac')} title='Fair' style={{ background: '#e0c5ac', border: selectedFoundation === '#e0c5ac' ? '2px solid rgb(100, 99, 99)' : '2px solid #e0c5ac' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e5b899')} title='Vanilla' style={{ background: '#e5b899', border: selectedFoundation === '#e5b899' ? '2px solid rgb(100, 99, 99)' : '2px solid #e5b899' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dab38d')} title='Warm Vanilla' style={{ background: '#dab38d', border: selectedFoundation === '#dab38d' ? '2px solid rgb(100, 99, 99)' : '2px solid #dab38d' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d6b28e')} title='Nude' style={{ background: '#d6b28e', border: selectedFoundation === '#d6b28e' ? '2px solid rgb(100, 99, 99)' : '2px solid #d6b28e' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d8a380')} title='Natural' style={{ background: '#d8a380', border: selectedFoundation === '#d8a380' ? '2px solid rgb(100, 99, 99)' : '2px solid #d8a380' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dba779')} title='True Beige' style={{ background: '#dba779', border: selectedFoundation === '#dba779' ? '2px solid rgb(100, 99, 99)' : 'v#dba779' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9e79')} title='Buff' style={{ background: '#cb9e79', border: selectedFoundation === '#cb9e79' ? '2px solid rgb(100, 99, 99)' : '2px solid #cb9e79' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9374')} title='Medium Buff' style={{ background: '#cb9374', border: selectedFoundation === '#cb9374' ? '2px solid rgb(100, 99, 99)' : '2px solid #cb9374' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9875')} title='Medium Olive' style={{ background: '#cb9875', border: selectedFoundation === '#cb9875' ? '2px solid rgb(100, 99, 99)' : '2px solid #cb9875' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ca926b')} title='Soft Beige' style={{ background: '#ca926b', border: selectedFoundation === '#ca926b' ? '2px solid rgb(100, 99, 99)' : '2px solid #ca926b' }}></button>
                </div>
              </div>
            ) : showLipstickProducts ? (
              //lipstick from maybelline-super stay vinyl ink
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetLipstick}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(1)} style={{ background: 'rgb(151, 15, 33)', border: selectedLipstick === 1 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(151, 15, 33)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(2)} style={{ background: 'rgb(195, 83, 83)', border: selectedLipstick === 2 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(195, 83, 83)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(3)} style={{ background: 'rgb(195, 73, 99)', border: selectedLipstick === 3 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(195, 73, 99)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(4)} style={{ background: 'rgb(226, 16, 17)', border: selectedLipstick === 4 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(226, 16, 17)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(5)} style={{ background: 'rgb(135, 10, 44)', border: selectedLipstick === 5 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(135, 10, 44)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(6)} style={{ background: 'rgb(173, 89, 89)', border: selectedLipstick === 6 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(173, 89, 89)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(7)} style={{ background: 'rgb(141, 70, 76)', border: selectedLipstick === 7 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(141, 70, 76)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(8)} style={{ background: 'rgb(185, 0, 37)', border: selectedLipstick === 8 ? '11x solid black' : '2px solid rgb(185, 0, 37)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(9)} style={{ background: 'rgb(218, 67, 90)', border: selectedLipstick === 9 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(218, 67, 90)' }}></button>
                <button className="makeup-option" onClick={() => handleLipstickClick(10)} style={{ background: 'rgb(191, 69, 89)', border: selectedLipstick === 10 ? '2px solid rgb(100, 99, 99)' : '2px solid rgb(191, 69, 89)' }}></button>
                </div>
              </div>
            ) : showBlushProducts ? (
              //blush from nars-powder blush
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={resetBlush}></button>
                <button className="makeup-option" onClick={() => handleBlushClick(1)} style={{ background: '#faa7a6', border: selectedBlush === 1 ? '2px solid rgb(100, 99, 99)' : '2px solid #faa7a6' }} alt="777"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(2)} style={{ background: '#f58a8f', border: selectedBlush === 2 ? '2px solid rgb(100, 99, 99)' : '2px solid #f58a8f' }} alt="778"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(3)} style={{ background: '#ff8288', border: selectedBlush === 3 ? '2px solid rgb(100, 99, 99)' : '2px solid #ff8288' }} alt="776"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(4)} style={{ background: '#a84d4b', border: selectedBlush === 4 ? '2px solid rgb(100, 99, 99)' : '2px solid #a84d4b' }} alt="775"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(5)} style={{ background: '#ef8e8d', border: selectedBlush === 5 ? '2px solid rgb(100, 99, 99)' : '2px solid #ef8e8d' }} alt="237"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(6)} style={{ background: '#ed6f5e', border: selectedBlush === 6 ? '2px solid rgb(100, 99, 99)' : '2px solid #ed6f5e' }} alt="923"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(7)} style={{ background: '#b86262', border: selectedBlush === 7 ? '2px solid rgb(100, 99, 99)' : '2px solid #b86262' }} alt="901"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(8)} style={{ background: '#bf636b', border: selectedBlush === 8 ? '2px solid rgb(100, 99, 99)' : '2px solid #bf636b' }} alt="888"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(9)} style={{ background: '#df7b7e', border: selectedBlush === 9 ? '2px solid rgb(100, 99, 99)' : '2px solid #df7b7e' }} alt="252"></button>
                <button className="makeup-option" onClick={() => handleBlushClick(10)} style={{ background: '#af6163', border: selectedBlush === 10 ? '2px solid rgb(100, 99, 99)' : '2px solid #af6163' }} alt="902"></button>
                </div>
              </div>
            ) : showEyeShadowProducts ? (
              showSingleEyeShadow ? (
               //nars-single eyeshadow
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B17D4B', 0)} title="Tulum" style={{ background: '#B17D4B', border: selectedEyeShadow === '#B17D4B' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#935035', 0)} title="Noumea" style={{ background: '#935035', border: selectedEyeShadow === '#935035' ? '2px solid rgb(100, 99, 99)' : '2px solid #935035' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#944A31', 2)} title="Guayaquil" style={{ backgroundImage: `url(${gq})`, border: selectedEyeShadow === '#944A31' ? '2px solid rgb(100, 99, 99)' : '2px solid #944A31' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7d5042', 0)} title="Sophia" style={{ background: '#7d5042', border: selectedEyeShadow === '#7d5042' ? '2px solid rgb(100, 99, 99)' : '2px solid #7d5042' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D44D2F', 0)} title="Persia" style={{ background: '#D44D2F', border: selectedEyeShadow === '#D44D2F' ? '2px solid rgb(100, 99, 99)' : '2px solid #D44D2F' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#8E283E', 0)} title="Ishta" style={{ background: '#8E283E', border: selectedEyeShadow === '#8E283E' ? '2px solid rgb(100, 99, 99)' : '2px solid #8E283E' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#895652', 0)} title="New York" style={{ background: '#895652', border: selectedEyeShadow === '#895652' ? '2px solid rgb(100, 99, 99)' : '2px solid #895652' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFCE19', 0)} title="Duoro" style={{ background: '#FFCE19', border: selectedEyeShadow === '#FFCE19' ? '2px solid rgb(100, 99, 99)' : '2px solid #FFCE19' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6B8A3', 1)} title="Night Star" style={{ backgroundImage: `url(${ns})`, border: selectedEyeShadow === '#F6B8A3' ? '2px solid rgb(100, 99, 99)' : '2px solid #F6B8A3' }}></button>
                 </div>
               </div>
             ) : showHardwiredEyeShadow ? (
               //nars-hardwired eyeshadow
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#f19ea1', 1)} title="Melrose" style={{ backgroundImage: `url(${mr})`, border: selectedEyeShadow === '#f19ea1' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#e9a486', 1)} title="Pattaya" style={{ backgroundImage: `url(${pt})`, border: selectedEyeShadow === '#e9a486' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#dd8776', 1)} title="Mendoza" style={{ backgroundImage: `url(${mz})`, border: selectedEyeShadow === '#dd8776' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#bd8797', 1)} title="Earthshine" style={{ backgroundImage: `url(${es})`, border: selectedEyeShadow === '#bd8797' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#af8070', 1)} title="Firenze" style={{ backgroundImage: `url(${fr})`, border: selectedEyeShadow === '#af8070' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#e4bd9b', 2)} title="Rio" style={{ backgroundImage: `url(${ri})`, border: selectedEyeShadow === '#e4bd9b' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#916982', 1)} title="Madrid" style={{ backgroundImage: `url(${md})`, border: selectedEyeShadow === '#916982' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#831e76', 1)} title="Chile" style={{ backgroundImage: `url(${ch})`, border: selectedEyeShadow === '#831e76' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showGlowshotEyeShadow ? (
               //nyx-ultimate glow shots liquid eyeshadow
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#adc4cf', 2)} title="Blueberry Baller" style={{ backgroundImage: `url(${bl})`, border: selectedEyeShadow === '#adc4cf' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#a9c47f', 1)} title="Kiwi Killa" style={{ backgroundImage: `url(${kk})`, border: selectedEyeShadow === '#a9c47f' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#dcd8d4', 1)} title="Coconut" style={{ backgroundImage: `url(${cc})`, border: selectedEyeShadow === '#dcd8d4' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#ba828d', 1)} title="Grapefruit" style={{ backgroundImage: `url(${gf})`, border: selectedEyeShadow === '#ba828d' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#f2e0a4', 1)} title="Lemon Slayed" style={{ backgroundImage: `url(${ls})`, border: selectedEyeShadow === '#f2e0a4' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#bf304c', 1)} title="Raspberry Rave" style={{ backgroundImage: `url(${rr})`, border: selectedEyeShadow === '#bf304c' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#ac7295', 1)} title="Plum Player" style={{ backgroundImage: `url(${pp})`, border: selectedEyeShadow === '#ac7295' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#9b625b', 1)} title="Pear Prize" style={{ backgroundImage: `url(${pr})`, border: selectedEyeShadow === '#9b625b' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#a33c51', 1)} title="Strawberry Stacked" style={{ backgroundImage: `url(${ss})`, border: selectedEyeShadow === '#a33c51' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#6c3f75', 1)} title="Feeling Grape" style={{ backgroundImage: `url(${fg})`, border: selectedEyeShadow === '#6c3f75' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#174077', 1)} title="Blueberry Bank" style={{ backgroundImage: `url(${bb})`, border: selectedEyeShadow === '#174077' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#3c816a', 1)} title="Watermelon Wealth" style={{ backgroundImage: `url(${ww})`, border: selectedEyeShadow === '#3c816a' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showCandyBerryEyeShadow ? (
               //dasique-candy berry eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F2CAC3', 2)} title="Berry Banana" style={{ backgroundImage: `url(${cb_bb})`, border: selectedEyeShadow === '#F2CAC3' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DB929B', 2)} title="Whipping Berry" style={{ backgroundImage: `url(${cb_wb})`, border: selectedEyeShadow === '#DB929B' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DAA5A3', 1)} title="Pink Star" style={{ backgroundImage: `url(${cb_ps})`, border: selectedEyeShadow === '#DAA5A3' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B4786F', 1)} title="Strawberry Cheese Cake" style={{ backgroundImage: `url(${cb_scc})`, border: selectedEyeShadow === '#B4786F' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D8717B', 2)} title="Cherry Chips" style={{ backgroundImage: `url(${cb_cc})`, border: selectedEyeShadow === '#D8717B' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E99293', 2)} title="Strawberry" style={{ backgroundImage: `url(${cb_s})`, border: selectedEyeShadow === '#E99293' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B3876F', 0)} title="Caramel" style={{ background: '#B3876F', border: selectedEyeShadow === '#B3876F' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#85594E', 0)} title="Real Choco" style={{ background: '#85594E', border: selectedEyeShadow === '#85594E' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7C4E43', 1)} title="Choco Berry Cake" style={{ backgroundImage: `url(${cb_cbc})`, border: selectedEyeShadow === '#7C4E43' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showVioletKnitEyeShadow ? ( 
               //dasique-violet knit eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FAE1DA', 2)} title="Silky Alpaca" style={{ backgroundImage: `url(${vk_sa})`, border: selectedEyeShadow === '#FAE1DA' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1C6BE', 2)} title="Lavender Cotton" style={{ backgroundImage: `url(${vk_lc})`, border: selectedEyeShadow === '#E1C6BE' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1B9B7', 1)} title="Pink Tweed" style={{ backgroundImage: `url(${vk_pt})`, border: selectedEyeShadow === '#E1B9B7' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D0A8A8', 2)} title="Violet Check" style={{ backgroundImage: `url(${vk_vc})`, border: selectedEyeShadow === '#D0A8A8' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D3A49B', 0)} title="Mauve Knit" style={{ background: '#D3A49B', border: selectedEyeShadow === '#D3A49B' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E3ACAC', 0)} title="Crimson Cardigan" style={{ background: '#E3ACAC', border: selectedEyeShadow === '#E3ACAC' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A7746E', 0)} title="Winter Sweater" style={{ background: '#A7746E', border: selectedEyeShadow === '#A7746E' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E6B4B2', 1)} title="Heather Spangle" style={{ backgroundImage: `url(${vk_hs})`, border: selectedEyeShadow === '#E6B4B2' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B5857E', 2)} title="Cashmere Coat" style={{ backgroundImage: `url(${vk_cc})`, border: selectedEyeShadow === '#B5857E' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showBerrySmoothieEyeShadow ? ( 
               //dasique-berry smoothie eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#EABCBB', 2)} title="Slush" style={{ backgroundImage: `url(${bs_s})`, border: selectedEyeShadow === '#EABCBB' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#EDA6AE', 1)} title="Pink Salt" style={{ backgroundImage: `url(${bs_ps})`, border: selectedEyeShadow === '#EDA6AE' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6D7E6', 0)} title="Icing" style={{ background: '#F6D7E6', border: selectedEyeShadow === '#F6D7E6' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F8E6EF', 2)} title="Berry Chip" style={{ backgroundImage: `url(${bs_bc})`, border: selectedEyeShadow === '#F8E6EF' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6D4DC', 0)} title="Creamy" style={{ background: '#F6D4DC', border: selectedEyeShadow === '#F6D4DC' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F9D8E5', 2)} title="Blush" style={{ backgroundImage: `url(${bs_b})`, border: selectedEyeShadow === '#F9D8E5' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F2C6DA', 2)} title="Sweet" style={{ backgroundImage: `url(${bs_sw})`, border: selectedEyeShadow === '#F2C6DA' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#EFB2CB', 0)} title="Juicy" style={{ background: '#EFB2CB', border: selectedEyeShadow === '#EFB2CB' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E9AACF', 0)} title="Blueberry" style={{ background: '#E9AACF', border: selectedEyeShadow === '#E9AACF' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E8A7CD', 2)} title="Soda" style={{ backgroundImage: `url(${bs_sd})`, border: selectedEyeShadow === '#E8A7CD' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1B5D1', 1)} title="Mauve Beam" style={{ backgroundImage: `url(${bs_mv})`, border: selectedEyeShadow === '#E1B5D1' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D29DC0', 1)} title="Frozen" style={{ backgroundImage: `url(${bs_fr})`, border: selectedEyeShadow === '#D29DC0' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D3A9B3', 2)} title="Fog" style={{ backgroundImage: `url(${bs_f})`, border: selectedEyeShadow === '#D3A9B3' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B48D92', 0)} title="Haze" style={{ background: '#B48D92', border: selectedEyeShadow === '#B48D92' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D88FAA', 1)} title="Cherry Cooler" style={{ backgroundImage: `url(${bs_cc})`, border: selectedEyeShadow === '#D88FAA' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E79DD2', 0)} title="Raspberry" style={{ background: '#E79DD2', border: selectedEyeShadow === '#E79DD2' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#815A55', 1)} title="Fudgy Berry" style={{ backgroundImage: `url(${bs_fb})`, border: selectedEyeShadow === '#815A55' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#9F7D7B', 0)} title="Mulberry" style={{ background: '#9F7D7B', border: selectedEyeShadow === '#9F7D7B' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showVintageJeanEyeShadow ? ( 
               //nyx-ultimate vintage jean eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E2DBC2', 2)} title="01" style={{ backgroundImage: `url(${vj01})`, border: selectedEyeShadow === '#E2DBC2' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FCFDF8', 0)} title="02" style={{ background: '#FCFDF8', boxShadow: 'inset 0 0 0 2px black', border: selectedEyeShadow === '#FCFDF8' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B68F7E', 0)} title="03" style={{ background: '#B68F7E', border: selectedEyeShadow === '#B68F7E' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C68080', 0)} title="04" style={{ background: '#C68080', border: selectedEyeShadow === '#C68080' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AA6D70', 2)} title="05" style={{ backgroundImage: `url(${vj05})`, border: selectedEyeShadow === '#AA6D70' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AB7455', 0)} title="06" style={{ background: '#AB7455', border: selectedEyeShadow === '#AB7455' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7B4B35', 0)} title="07" style={{ background: '#7B4B35', border: selectedEyeShadow === '#7B4B35' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#574547', 2)} title="08" style={{ backgroundImage: `url(${vj08})`, border: selectedEyeShadow === '#574547' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#596982', 0)} title="09" style={{ background: '#596982', border: selectedEyeShadow === '#596982' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#6A5A56', 1)} title="10" style={{ backgroundImage: `url(${vj10})`, border: selectedEyeShadow === '#6A5A56' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#5298BC', 0)} title="11" style={{ background: '#5298BC', border: selectedEyeShadow === '#5298BC' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#8B9DC5', 0)} title="12" style={{ background: '#8B9DC5', border: selectedEyeShadow === '#8B9DC5' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A89E9F', 2)} title="13" style={{ backgroundImage: `url(${vj13})`, border: selectedEyeShadow === '#A89E9F' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#477085', 2)} title="14" style={{ backgroundImage: `url(${vj14})`, border: selectedEyeShadow === '#477085' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#4C3643', 0)} title="15" style={{ background: '#4C3643', border: selectedEyeShadow === '#4C3643' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#2B2040', 0)} title="16" style={{ background: '#2B2040', border: selectedEyeShadow === '#2B2040' ? '2px solid rgb(100, 99, 99)' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showAfterglowEyeShadow ? ( 
               //Nars-afterglow irresistible eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F7E0D1', 2)} title='Adoration' style={{ backgroundImage: `url(${ag_ad})`, border: selectedEyeShadow === '#F7E0D1' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DC9A73', 2)} title='Amorous' style={{ backgroundImage: `url(${ag_am})`, border: selectedEyeShadow === '#DC9A73' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D67F7E', 2)} title='Blaze' style={{ backgroundImage: `url(${ag_bl})`, border: selectedEyeShadow === '#D67F7E' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D27D5A', 2)} title='Hot Rod' style={{ backgroundImage: `url(${ag_hr})`, border: selectedEyeShadow === '#D27D5A' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C3857A', 0)} title='Magnetism' style={{ background: '#C3857A', border: selectedEyeShadow === '#C3857A' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#E4989D', 2)} title='High Stakes' style={{ backgroundImage: `url(${ag_hs})`, border: selectedEyeShadow === '#E4989D' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AD544B', 0)} title='Take a Shot' style={{ background: '#AD544B', border: selectedEyeShadow === '#AD544B' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C57870', 2)} title='Frisky' style={{ backgroundImage: `url(${ag_fr})`, border: selectedEyeShadow === '#C57870' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#904931', 0)} title='Mood Swing' style={{ background: '#904931', border: selectedEyeShadow === '#904931' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AC6C5D', 2)} title='Pure Bliss' style={{ backgroundImage: `url(${ag_pb})`, border: selectedEyeShadow === '#AC6C5D' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#6C3E34', 0)} title='Midnight' style={{ background: '#6C3E34', border: selectedEyeShadow === '#6C3E34' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#9E6140', 2)} title='Nitro' style={{ backgroundImage: `url(${ag_ni})`, border: selectedEyeShadow === '#9E6140' ? '2px solid #646363' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showIcyNudeEyeShadow ? ( 
               //Huda beauty-icy nude eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#ECD8E3', 2)} title='Iced Out' style={{ backgroundImage: `url(${in_io})`, border: selectedEyeShadow === '#ECD8E3' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#CDA29C', 0)} title='Highlight' style={{ background: '#CDA29C', border: selectedEyeShadow === '#CDA29C' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#BCAEB2', 2)} title='Platinum' style={{ backgroundImage: `url(${in_pl})`, border: selectedEyeShadow === '#BCAEB2' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#87524E', 0)} title='Unapologetic' style={{ background: '#87524E', border: selectedEyeShadow === '#87524E' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#755451', 0)} title='Faux Fur' style={{ background: '#755451', border: selectedEyeShadow === '#755451' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D59C78', 2)} title='Gold Standard' style={{ backgroundImage: `url(${in_gs})`, border: selectedEyeShadow === '#D59C78' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F0E8E5', 0)} title='Avalanche' style={{ background: '#F0E8E5', border: selectedEyeShadow === '#F0E8E5' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#834E3F', 2)} title='Aurora' style={{ backgroundImage: `url(${in_ar})`, border: selectedEyeShadow === '#834E3F' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AE9486', 1)} title='VVS' style={{ backgroundImage: `url(${in_vvs})`, border: selectedEyeShadow === '#AE9486' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A3897F', 0)} title='Poised' style={{ background: '#A3897F', border: selectedEyeShadow === '#A3897F' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#5A4444', 0)} title='She Rich' style={{ background: '#5A4444', border: selectedEyeShadow === '#5A4444' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#EAC0A7', 0)} title='Cold Plunge' style={{ background: '#EAC0A7', border: selectedEyeShadow === '#EAC0A7' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F4D1D8', 0)} title='IDC' style={{ background: '#F4D1D8', border: selectedEyeShadow === '#F4D1D8' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#837A70', 2)} title='Bling' style={{ backgroundImage: `url(${in_bl})`, border: selectedEyeShadow === '#837A70' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C6ADA6', 0)} title='Oneself' style={{ background: '#C6ADA6', border: selectedEyeShadow === '#C6ADA6' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#544A3B', 1)} title='Diamond Dew' style={{ backgroundImage: `url(${in_dd})`, border: selectedEyeShadow === '#544A3B' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C09189', 0)} title='Lavish' style={{ background: '#C09189', border: selectedEyeShadow === '#C09189' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D5A484', 0)} title='First Class' style={{ background: '#D5A484', border: selectedEyeShadow === '#D5A484' ? '2px solid #646363' : '2px solid transparent' }}></button>
                 </div>
               </div>
             ) : showUltimateUtopiaEyeShadow ? ( 
               //Nyx-ultimate utopia 40 pan eyeshadow palette
               <div className="product-options-container">
                 <div className="product-options">
                   <button className="back-option" onClick={handleEyeshadowBack}>
                     <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                   <button className="reset-option" onClick={resetEyeshadow}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFD3AC', 0)} title='01' style={{ background: '#FFD3AC', border: selectedEyeShadow === '#FFD3AC' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#EF9D83', 2)} title='02' style={{ backgroundImage: `url(${uu02})`, border: selectedEyeShadow === '#EF9D83' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFD5BD', 0)} title='03' style={{ background: '#FFD5BD', border: selectedEyeShadow === '#FFD5BD' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F7D1C6', 0)} title='04' style={{ background: '#F7D1C6', border: selectedEyeShadow === '#F7D1C6' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#ED8A84', 0)} title='05' style={{ background: '#ED8A84', border: selectedEyeShadow === '#ED8A84' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A18E7A', 2)} title='06' style={{ backgroundImage: `url(${uu06})`, border: selectedEyeShadow === '#A18E7A' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#CFD4F2', 0)} title='07' style={{ background: '#CFD4F2', border: selectedEyeShadow === '#CFD4F2' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D2BFB8', 0)} title='08' style={{ background: '#D2BFB8', border: selectedEyeShadow === '#D2BFB8' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B9B888', 2)} title='09' style={{ backgroundImage: `url(${uu09})`, border: selectedEyeShadow === '#B9B888' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#8C896A', 0)} title='10' style={{ background: '#8C896A', border: selectedEyeShadow === '#8C896A' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#BDAD8C', 2)} title='11' style={{ backgroundImage: `url(${uu11})`, border: selectedEyeShadow === '#BDAD8C' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#AF695F', 0)} title='12' style={{ background: '#AF695F', border: selectedEyeShadow === '#AF695F' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DFA050', 1)} title='13' style={{ backgroundImage: `url(${uu13})`, border: selectedEyeShadow === '#DFA050' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#855E5F', 0)} title='14' style={{ background: '#855E5F', border: selectedEyeShadow === '#855E5F' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A5ACB4', 0)} title='15' style={{ background: '#A5ACB4', border: selectedEyeShadow === '#A5ACB4' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B69888', 2)} title='16' style={{ backgroundImage: `url(${uu16})`, border: selectedEyeShadow === '#B69888' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DA7C56', 0)} title='17' style={{ background: '#DA7C56', border: selectedEyeShadow === '#DA7C56' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#885C41', 2)} title='18' style={{ backgroundImage: `url(${uu18})`, border: selectedEyeShadow === '#885C41' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A55033', 0)} title='19' style={{ background: '#A55033', border: selectedEyeShadow === '#A55033' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7F6407', 1)} title='20' style={{ backgroundImage: `url(${uu20})`, border: selectedEyeShadow === '#7F6407' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DA855E', 2)} title='21' style={{ backgroundImage: `url(${uu21})`, border: selectedEyeShadow === '#DA855E' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#40110B', 0)} title='22' style={{ background: '#40110B', border: selectedEyeShadow === '#40110B' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#849994', 2)} title='23' style={{ backgroundImage: `url(${uu23})`, border: selectedEyeShadow === '#849994' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#1C373E', 0)} title='24' style={{ background: '#1C373E', border: selectedEyeShadow === '#1C373E' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C3621E', 0)} title='25' style={{ background: '#C3621E', border: selectedEyeShadow === '#C3621E' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#A17A44', 1)} title='26' style={{ backgroundImage: `url(${uu26})`, border: selectedEyeShadow === '#A17A44' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#80261B', 0)} title='27' style={{ background: '#80261B', border: selectedEyeShadow === '#80261B' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#DC6859', 0)} title='28' style={{ background: '#DC6859', border: selectedEyeShadow === '#DC6859' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#2A2927', 0)} title='29' style={{ background: '#2A2927', border: selectedEyeShadow === '#2A2927' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#473B3B', 0)} title='30' style={{ background: '#473B3B', border: selectedEyeShadow === '#473B3B' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#524F52', 2)} title='31' style={{ backgroundImage: `url(${uu31})`, border: selectedEyeShadow === '#524F52' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#382C2C', 0)} title='32' style={{ background: '#382C2C', border: selectedEyeShadow === '#382C2C' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#2F232F', 0)} title='33' style={{ background: '#2F232F', border: selectedEyeShadow === '#2F232F' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#6C261C', 0)} title='34' style={{ background: '#6C261C', border: selectedEyeShadow === '#6C261C' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7A4C27', 0)} title='35' style={{ background: '#7A4C27', border: selectedEyeShadow === '#7A4C27' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#3D2312', 2)} title='36' style={{ backgroundImage: `url(${uu36})`, border: selectedEyeShadow === '#3D2312' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#87392D', 2)} title='37' style={{ backgroundImage: `url(${uu37})`, border: selectedEyeShadow === '#87392D' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B56858', 2)} title='38' style={{ backgroundImage: `url(${uu38})`, border: selectedEyeShadow === '#B56858' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#C05940', 0)} title='39' style={{ background: '#C05940', border: selectedEyeShadow === '#C05940' ? '2px solid #646363' : '2px solid transparent' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#575474', 2)} title='40' style={{ backgroundImage: `url(${uu40})`, border: selectedEyeShadow === '#575474' ? '2px solid #646363' : '2px solid transparent' }}></button>
                 </div>
               </div>
                ) : ( 
                  <div className="type-options">
                    <button className="back-option" onClick={handleBack}>
                      <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                    <button className="es-option" onClick={() => handleSingleESBtnClick()} title="NARS-Single Eyeshadows"> 
                      <img src={s_es} alt="Single"/></button>
                    <button className="es-option" onClick={() => handleHardwiredESBtnClick()} title="NARS-Hardwired Eyeshadows">
                      <img src={hw_es} alt="Hadwired"/></button>
                    <button className="es-option" onClick={() => handleGlowshotESBtnClick()} title="NYX-Ultimate Glow Shots Liquid Eyeshadow">
                      <img src={gs_es} alt="Glowshots"/></button>
                    <button className="es-option" onClick={() => handleCandyBerryESBtnClick()} title="Dasique-Candy Berry Eyeshadow Palette">
                      <img src={cb_es} alt="CandyBerry"/></button>
                    <button className="es-option" onClick={() => handleVioletKnitESBtnClick()} title="Dasique-Violet Knit Eyeshadow Palette">
                      <img src={vk_es} alt="VioletKnit"/></button>
                    <button className="es-option" onClick={() => handleBerrySmoothieESBtnClick()} title="Dasique-Berry Smoothie Eyeshadow Palette">
                      <img src={bs_es} alt="BerrySmoothie"/></button>
                    <button className="es-option" onClick={() => handleVintageJeanESBtnClick()} title="NYX-Ultimate Vintage Jean Palette">
                      <img src={vj_es} alt="VintageJean"/></button>
                    <button className="es-option" onClick={() => handleAfterglowESBtnClick()} title="NARS-Afterglow Irresistible Eyeshadow Palette">
                      <img src={ag_es} alt="AfterGlow"/></button>
                    <button className="es-option" onClick={() => handleIcyNudeESBtnClick()} title="Huda Beauty-Icy Nude Eyeshadow Palette">
                      <img src={in_es} alt="IcyNude"/></button>
                    <button className="es-option" onClick={() => handleUltimateUtopiaESBtnClick()} title="NYX-Ultimate Utopia 40 Pan Palette">
                      <img src={uu_es} alt="UltimateUtopia"/></button>
                  </div>
              )
            ) : (                    
              <div className="type-options">
              <button className="product-option" onClick={() => handleFoundationBtnClick()}>
                Foundation</button>
              <button className="product-option" onClick={() => handleLipstickBtnClick()}>
                Lipstick</button>
              <button className="product-option" onClick={() => handleBlushBtnClick()}>
                Blush</button>
              <button className="product-option" onClick={() => handleEyeShadowBtnClick()}>
                Eye Shadow</button>
            </div>
            )}

            <div className="action-buttons">
              <button id="mk-btn">Makeup</button>
              <button id="ac-btn" onClick={() => handleAccessoryBtnClick()}>Accessory</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default VirtualTryOnLive;
