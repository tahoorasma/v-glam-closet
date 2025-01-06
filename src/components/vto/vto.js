import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './vto.css';
import cmp from './images/compare.jpg'
import buy from './images/blush.jpg'
import s_es from './images/eyeshadows/single.png'
import hw_es from './images/eyeshadows/hardwired.png'
import gs_es from './images/eyeshadows/glowshots.png'
import cb_es from './images/eyeshadows/candy-berry.png'
import vk_es from './images/eyeshadows/violet-knit.png'
import bs_es from './images/eyeshadows/berry-smoothie.png'
import vj_es from './images/eyeshadows/vintage-jean.png'
import ag_es from './images/eyeshadows/afterglow.png'
import in_es from './images/eyeshadows/icy-nude.png'
import uu_es from './images/eyeshadows/ultimate-utopia.png'
import ns from './images/eyeshadows/night-star.png'
import gq from './images/eyeshadows/guayaquil.png'
import ss from './images/eyeshadows/glowshots/strawberry-stacked.png'
import gf from './images/eyeshadows/glowshots/grapefruit.png'
import fg from './images/eyeshadows/glowshots/feeling-grape.png'
import rr from './images/eyeshadows/glowshots/raspberry-rave.png'
import bb from './images/eyeshadows/glowshots/blueberry-bank.png'
import ww from './images/eyeshadows/glowshots/watermelon-wealth.png'
import bl from './images/eyeshadows/glowshots/blueberry-baller.png'
import cc from './images/eyeshadows/glowshots/coconut.png'
import kk from './images/eyeshadows/glowshots/kiwi-killa.png'
import ls from './images/eyeshadows/glowshots/lemon-slayed.png'
import pr from './images/eyeshadows/glowshots/pear-prize.png'
import pp from './images/eyeshadows/glowshots/plum-player.png'
import mr from './images/eyeshadows/hardwired/melrose.png'
import pt from './images/eyeshadows/hardwired/pattaya.png'
import mz from './images/eyeshadows/hardwired/mendoza.png'
import fr from './images/eyeshadows/hardwired/firenze.png'
import md from './images/eyeshadows/hardwired/madrid.png'
import es from './images/eyeshadows/hardwired/earthshine.png'
import ch from './images/eyeshadows/hardwired/chile.png'
import ri from './images/eyeshadows/hardwired/rio.png'
import cb_bb from './images/eyeshadows/candyberry/berry-banana.png'
import cb_cc from './images/eyeshadows/candyberry/cherry-chips.png'
import cb_cbc from './images/eyeshadows/candyberry/choco-berrycake.png'
import cb_ps from './images/eyeshadows/candyberry/pink-star.png'
import cb_scc from './images/eyeshadows/candyberry/strawberry-cheesecake.png'
import cb_s from './images/eyeshadows/candyberry/strawberry.png'
import cb_wb from './images/eyeshadows/candyberry/whipping-berry.png'
import vk_hs from './images/eyeshadows/violetknit/heather-spangle.png'
import vk_cc from './images/eyeshadows/violetknit/cashmere-coat.png'
import vk_pt from './images/eyeshadows/violetknit/pink-tweed.png'
import vk_vc from './images/eyeshadows/violetknit/violet-check.png'
import vk_lc from './images/eyeshadows/violetknit/lavender-cotton.png'
import vk_sa from './images/eyeshadows/violetknit/silky-alpaca.png'
import bs_bc from './images/eyeshadows/berrysmoothie/berry-chip.png'
import bs_b from './images/eyeshadows/berrysmoothie/blush.png'
import bs_cc from './images/eyeshadows/berrysmoothie/cherry-cooler.png'
import bs_f from './images/eyeshadows/berrysmoothie/fog.png'
import bs_fr from './images/eyeshadows/berrysmoothie/frozen.png'
import bs_fb from './images/eyeshadows/berrysmoothie/fudgy-berry.png'
import bs_mv from './images/eyeshadows/berrysmoothie/mauve-beam.png'
import bs_ps from './images/eyeshadows/berrysmoothie/pink-salt.png'
import bs_s from './images/eyeshadows/berrysmoothie/slush.png'
import bs_sd from './images/eyeshadows/berrysmoothie/soda.png'
import bs_sw from './images/eyeshadows/berrysmoothie/sweet.png'
import vj01 from './images/eyeshadows/vintagejean/vj01.png'
import vj05 from './images/eyeshadows/vintagejean/vj05.png'
import vj08 from './images/eyeshadows/vintagejean/vj08.png'
import vj10 from './images/eyeshadows/vintagejean/vj10.png'
import vj13 from './images/eyeshadows/vintagejean/vj13.png'
import vj14 from './images/eyeshadows/vintagejean/vj14.png'
import ag_ad from './images/eyeshadows/afterglow/adoration.png'
import ag_am from './images/eyeshadows/afterglow/amorous.png'
import ag_bl from './images/eyeshadows/afterglow/blaze.png'
import ag_fr from './images/eyeshadows/afterglow/frisky.png'
import ag_hs from './images/eyeshadows/afterglow/high-stakes.png'
import ag_hr from './images/eyeshadows/afterglow/hot-rod.png'
import ag_ni from './images/eyeshadows/afterglow/nitro.png'
import ag_pb from './images/eyeshadows/afterglow/pure-bliss.png'
import in_ar from './images/eyeshadows/icynude/aurora.png'
import in_bl from './images/eyeshadows/icynude/bling.png'
import in_dd from './images/eyeshadows/icynude/diamond-dew.png'
import in_gs from './images/eyeshadows/icynude/gold-standard.png'
import in_io from './images/eyeshadows/icynude/iced-out.png'
import in_pl from './images/eyeshadows/icynude/platinum.png'
import in_vvs from './images/eyeshadows/icynude/vvs.png'
import uu02 from './images/eyeshadows/ultimateutopia/uu02.png'
import uu06 from './images/eyeshadows/ultimateutopia/uu06.png'
import uu09 from './images/eyeshadows/ultimateutopia/uu09.png'
import uu11 from './images/eyeshadows/ultimateutopia/uu11.png'
import uu13 from './images/eyeshadows/ultimateutopia/uu13.png'
import uu16 from './images/eyeshadows/ultimateutopia/uu16.png'
import uu18 from './images/eyeshadows/ultimateutopia/uu18.png'
import uu20 from './images/eyeshadows/ultimateutopia/uu20.png'
import uu21 from './images/eyeshadows/ultimateutopia/uu21.png'
import uu23 from './images/eyeshadows/ultimateutopia/uu23.png'
import uu26 from './images/eyeshadows/ultimateutopia/uu26.png'
import uu31 from './images/eyeshadows/ultimateutopia/uu31.png'
import uu36 from './images/eyeshadows/ultimateutopia/uu36.png'
import uu37 from './images/eyeshadows/ultimateutopia/uu37.png'
import uu38 from './images/eyeshadows/ultimateutopia/uu38.png'
import uu40 from './images/eyeshadows/ultimateutopia/uu40.png'
import defaultModel from './images/models/model1.png';
import axios from 'axios';
import Navbar from '../navbar';

const VirtualTryOn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState(defaultModel);
  const [processedImage, setProcessedImage] = useState(null); 
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
    if (location.state?.imageSource) {
      setImageSource(location.state.imageSource);
    } else if (location.state?.selectedModel) {
      try {
          console.log('Selected Model:', location.state.selectedModel);
          setImageSource(require(`./images/${location.state.selectedModel}`));
      } catch (error) {
          console.error('Error loading image:', error);
          setImageSource(defaultModel);
      }
    } else if (location.state?.uploadPhoto) {
      if (location.state?.uploadPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => setImageSource(e.target.result);
        reader.readAsDataURL(location.state.uploadPhoto);
        return;
    }
    
    }
  }, [location.state]);  

  const handleBack = async () => {
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
  const handleFoundationClick = async (shadeColor) => {
    setSelectedFoundation(shadeColor);

    const formData = new FormData();

    let imageFile;
    try {
        if (location.state?.uploadPhoto) {
            imageFile = location.state.uploadPhoto;
        } else if (location.state?.selectedModel) {
          const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else if (location.state?.imageSource) {
            const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else {
            const response = await fetch(defaultModel);
            const blob = await response.blob();
            imageFile = new File([blob], "model.jpg", { type: blob.type });
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
        alert("Failed to load image. Please check your setup.");
        return;
    }

    if (!imageFile) {
        console.error("No valid image file found.");
        alert("No valid image available for processing.");
        return;
    }
    console.log("Image File:", imageFile);
    console.log("Foundation Shade:", shadeColor);
    console.log("Foundation: ", selectedFoundation);
    formData.append('image', imageFile);
    formData.append('foundation', shadeColor);

    try {
        const response = await axios.post('http://localhost:5000/foundation-try-on', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setProcessedImage(response.data.processed_image_url);
    } catch (error) {
        console.error('Error processing foundation:', error);
        alert('Failed to apply foundation. Please try again.');
    }
  };
  const handleBlushClick = async (blushId) => {
    const validBlushIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    if (!validBlushIds.includes(blushId)) {
        alert("Invalid blush selection.");
        return;
    }
    setSelectedBlush(blushId);
    const formData = new FormData();
    let imageFile;
    try {
      if (location.state?.uploadPhoto) {
          imageFile = location.state.uploadPhoto;
      } else if (location.state?.selectedModel) {
        const response = await fetch(imageSource);
          const blob = await response.blob();
          imageFile = new File([blob], imageSource, { type: blob.type });
      } else if (location.state?.imageSource) {
          const response = await fetch(imageSource);
          const blob = await response.blob();
          imageFile = new File([blob], imageSource, { type: blob.type });
      } else {
          const response = await fetch(defaultModel);
          const blob = await response.blob();
          imageFile = new File([blob], "model.jpg", { type: blob.type });
      }
    } catch (error) {
        console.error("Error fetching the image:", error);
        alert("Failed to load image. Please check your setup.");
        return;
    }
    if (!imageFile) {
        console.error("No valid image file found.");
        alert("No valid image available for processing.");
        return;
    }
    console.log("Blush", selectedBlush);
    formData.append('image', imageFile);
    formData.append('blush', blushId.toString());
    try {
        const response = await axios.post('http://localhost:5000/apply-blush', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status === "success") {
            setProcessedImage(response.data.processed_image_url);
        } else {
            console.error('Failed to apply blush:', response.data.message);
            alert('Failed to apply blush. Please try again.');
        }
    } catch (error) {
        console.error('Error in handleBlushClick:', error);
        alert('Failed to apply blush. Please try again.');
    }
};

const handleLipstickClick = async (lipstickId) => {
  setSelectedLipstick(lipstickId);

  const formData = new FormData();

  let imageFile;
  try {
    if (location.state?.uploadPhoto) {
      imageFile = location.state.uploadPhoto;
    } else if (location.state?.selectedModel) {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      imageFile = new File([blob], imageSource, { type: blob.type });
    } else if (location.state?.imageSource) {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      imageFile = new File([blob], imageSource, { type: blob.type });
    } else {
      const response = await fetch(defaultModel);
      const blob = await response.blob();
      imageFile = new File([blob], "model.jpg", { type: blob.type });
    }
  } catch (error) {
    console.error("Error fetching the image:", error);
    alert("Failed to load image. Please check your setup.");
    return;
  }

  if (!imageFile) {
    console.error("No valid image file found.");
    alert("No valid image available for processing.");
    return;
  }
  console.log("Lipstick", selectedLipstick);
  formData.append('image', imageFile);
  formData.append('lipstick', lipstickId);

  try {
    const response = await axios.post('http://localhost:5000/apply-lipstick', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.status === "success") {
        setProcessedImage(response.data.processed_image_url);
    } else {
        console.error('Failed to apply lipstick:', response.data.message);
        alert('Failed to apply lipstick. Please try again.');
    }
} catch (error) {
    console.error('Error in handleLipstickClick:', error);
    alert('Failed to apply lipstick. Please try again.');
}
};

const handleEyeShadowClick = async (eyeShadowColor, isGlitter) => {
    setSelectedEyeShadow(eyeShadowColor);

    const formData = new FormData();

    let imageFile;
    try {
        if (location.state?.uploadPhoto) {
            imageFile = location.state.uploadPhoto;
        } else if (location.state?.selectedModel) {
            const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else if (location.state?.imageSource) {
            const response = await fetch(imageSource);
            const blob = await response.blob();
            imageFile = new File([blob], imageSource, { type: blob.type });
        } else {
            const response = await fetch(defaultModel);
            const blob = await response.blob();
            imageFile = new File([blob], "model.jpg", { type: blob.type });
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
        alert("Failed to load image. Please check your setup.");
        return;
    }

    if (!imageFile) {
        console.error("No valid image file found.");
        alert("No valid image available for processing.");
        return;
    }
    console.log('Eyeshadow', selectedEyeShadow);
    formData.append('image', imageFile);
    formData.append('eyeShadow', eyeShadowColor);
    formData.append('glitter', isGlitter);

    try {
        const response = await axios.post('http://localhost:5000/eyeshadow-try-on', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setProcessedImage(response.data.processed_image_url);
    } catch (error) {
        console.error('Error processing eyeshadow:', error);
        alert('Failed to apply eyeshadow. Please try again.');
    }
  };
  
  const handleAccessoryBtnClick = () => {
      navigate('/virtual-try-on-accessory', { state: { imageSource }});
  };

  const handleReset = () => {
    setSelectedFoundation(null);
    setSelectedLipstick(null);
    setSelectedEyeShadow(null);
    setProcessedImage(null); 
    setImageSource(imageSource);
  };

  return (
    <div>
      <div className="header">V-Glam Closet</div>
      <Navbar />

      <div className="virtual-tryon-container">
        <h3><b>VIRTUAL TRY-ON</b></h3>
        <p>Time to make up your mind! Experience your perfect makeup shades or try a bold new look with our virtual try-on tool.</p>

        <div className="tryon-ui">
          <div className="row">
            <div className="col-12 col-md-10">
              <div className="photo-area">
                <div className="model-container">
                  {processedImage ? (
                    <img id="user-photo" src={processedImage} alt="Processed" />
                  ) : (
                    <img id="user-photo" src={imageSource} alt="User" />
                  )}
                </div>
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
          </div>

          <div className="controls">
            { showFoundationProducts ? (
              //foundation from NYX
              <div className="product-options-container">
                <div className="product-options">
                  <button className="back-option" onClick={handleBack}>
                    <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                  <button className="reset-option" onClick={handleReset}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fed4b1')} title='Pale' style={{ background: '#fed4b1' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#fccab7')} title='Light Porcelain' style={{ background: '#fccab7' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ecc4a9')} title='Light Ivory' style={{ background: '#ecc4a9' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e3b69a')} title='Light' style={{ background: '#e3b69a' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e0c5ac')} title='Fair' style={{ background: '#e0c5ac' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#e5b899')} title='Vanilla' style={{ background: '#e5b899' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dab38d')} title='Warm Vanilla' style={{ background: '#dab38d' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d6b28e')} title='Nude' style={{ background: '#d6b28e' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#d8a380')} title='Natural' style={{ background: '#d8a380' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#dba779')} title='True Beige' style={{ background: '#dba779' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9e79')} title='Buff' style={{ background: '#cb9e79' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9374')} title='Medium Buff' style={{ background: '#cb9374' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#cb9875')} title='Medium Olive' style={{ background: '#cb9875' }}></button>
                  <button className="makeup-option" onClick={() => handleFoundationClick('#ca926b')} title='Soft Beige' style={{ background: '#ca926b' }}></button>
                  {/* */}
                </div>
              </div>
            ) : showLipstickProducts ? (
              //lipstick from maybelline-super stay vinyl ink
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(1)} style={{ background: 'rgb(151, 15, 33)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(2)} style={{ background: 'rgb(195, 83, 83)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(3)} style={{ background: 'rgb(195, 73, 99)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(4)} style={{ background: 'rgb(226, 16, 17)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(5)} style={{ background: 'rgb(135, 10, 44)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(6)} style={{ background: 'rgb(173, 89, 89)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(7)} style={{ background: 'rgb(141, 70, 76)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(8)} style={{ background: 'rgb(185, 0, 37)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(9)} style={{ background: 'rgb(218, 67, 90)' }}></button>
                  <button className="makeup-option" onClick={() => handleLipstickClick(10)} style={{ background: 'rgb(191, 69, 89)' }}></button>
                </div>
              </div>
            ) : showBlushProducts ? (
              //blush from nars-powder blush
              <div className="product-options-container">
                <div className="product-options">
                <button className="back-option" onClick={handleBack}>
                  <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                <button className="reset-option" onClick={handleReset}></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(1)} style={{ background: '#faa7a6' }} alt="777"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(2)} style={{ background: '#f58a8f' }} alt="778"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(3)} style={{ background: '#ff8288' }} alt="776"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(4)} style={{ background: '#a84d4b' }} alt="775"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(5)} style={{ background: '#ef8e8d' }} alt="237"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(6)} style={{ background: '#ed6f5e' }} alt="923"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(7)} style={{ background: '#b86262' }} alt="901"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(8)} style={{ background: '#bf636b' }} alt="888"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(9)} style={{ background: '#df7b7e' }} alt="252"></button>
                  <button className="makeup-option" onClick={() => handleBlushClick(10)} style={{ background: '#af6163' }} alt="902"></button>
                </div>
              </div>
            ) : showEyeShadowProducts ? (
                 showSingleEyeShadow ? (
                  //nars-single eyeshadow
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#B17D4B', 0)} title='Tulum' style={{ background: '#B17D4B' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#935035', 0)} title='Noumea' style={{ background: '#935035' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#944A31', 2)} title='Guayaquil' style={{ backgroundImage:  `url(${gq})` }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#7d5042', 0)} title='Sophia' style={{ background: '#7d5042' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#D44D2F', 0)} title='Persia' style={{ background: '#D44D2F' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#8E283E', 0)} title='Ishta' style={{ background: '#8E283E' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#895652', 0)} title='New York' style={{ background: '#895652' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFCE19', 0)} title='Duoro' style={{ background: '#FFCE19' }}></button>
                      <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6B8A3', 1)} title='Night Star' style={{ backgroundImage:  `url(${ns})` }}></button>
                    </div>
                  </div>
                ) : showHardwiredEyeShadow ? (
                  //nars-hardwired eyeshadow
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#f19ea1', 1)} title='Melrose' style={{ backgroundImage:  `url(${mr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#e9a486', 1)} title='Pattaya' style={{ backgroundImage:  `url(${pt})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#dd8776', 1)} title='Mendoza' style={{ backgroundImage:  `url(${mz})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#bd8797', 1)} title='Earthshine' style={{ backgroundImage:  `url(${es})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#af8070', 1)} title='Firenze' style={{ backgroundImage:  `url(${fr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#e4bd9b', 2)} title='Rio' style={{ backgroundImage:  `url(${ri})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#916982', 1)} title='Madrid' style={{ backgroundImage:  `url(${md})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#831e76', 1)} title='Chile' style={{ backgroundImage:  `url(${ch})` }}></button>
                    </div>
                  </div>
                ) : showGlowshotEyeShadow ? (
                  //nyx-ultimate glow shots liquid eyeshadow
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#adc4cf', 2)} title='Blueberry Baller' style={{ backgroundImage:  `url(${bl})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#a9c47f', 1)} title='Kiwi Killa' style={{ backgroundImage:  `url(${kk})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#dcd8d4', 1)} title='Coconut' style={{ backgroundImage:  `url(${cc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#ba828d', 1)} title='Grapefruit' style={{ backgroundImage:  `url(${gf})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#f2e0a4', 1)} title='Lemon Slayed' style={{ backgroundImage:  `url(${ls})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#bf304c', 1)} title='Raspberry Rave' style={{ background: `url(${rr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#ac7295', 1)} title='Plum Player' style={{ backgroundImage:  `url(${pp})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#9b625b', 1)} title='Pear Prize' style={{ backgroundImage:  `url(${pr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#a33c51', 1)} title='Strawberry Stacked' style={{ backgroundImage:  `url(${ss})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#6c3f75', 1)} title='Feeling Grape' style={{ background: `url(${fg})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#174077', 1)} title='Blueberry Bank' style={{ background: `url(${bb})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#3c816a', 1)} title='Watermelon Wealth' style={{ background: `url(${ww})` }}></button>
                    </div>
                  </div>
                ) : showCandyBerryEyeShadow ? (
                  //dasique-candy berry eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F2CAC3', 2)} title='Berry Banana' style={{ backgroundImage:  `url(${cb_bb})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DB929B', 2)} title='Whipping Berry' style={{ backgroundImage:  `url(${cb_wb})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DAA5A3', 1)} title='Pink Star' style={{ backgroundImage:  `url(${cb_ps})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B4786F', 1)} title='Strawberry Cheese Cake' style={{ backgroundImage:  `url(${cb_scc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D8717B', 2)} title='Cherry Chips' style={{ backgroundImage:  `url(${cb_cc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E99293', 2)} title='Strawberry' style={{ backgroundImage: `url(${cb_s})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B3876F', 0)} title='Caramel' style={{ background:  '#B3876F' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#85594E', 0)} title='Real Choco' style={{ background: '#85594E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#7C4E43', 1)} title='Choco Berry Cake' style={{ backgroundImage:  `url(${cb_cbc})` }}></button>
                    </div>
                  </div>
                ) : showVioletKnitEyeShadow ? ( 
                  //dasique-violet knit eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#FAE1DA', 2)} title='Silky Alpaca' style={{ backgroundImage:  `url(${vk_sa})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1C6BE', 2)} title='Lavender Cotton' style={{ backgroundImage:  `url(${vk_lc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1B9B7', 1)} title='Pink Tweed' style={{ backgroundImage:  `url(${vk_pt})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D0A8A8', 2)} title='Violet Check' style={{ backgroundImage:  `url(${vk_vc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D3A49B', 0)} title='Mauve Knit' style={{ background: '#D3A49B' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E3ACAC', 0)} title='Crimson Cardigan' style={{ background: '#E3ACAC' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A7746E', 0)} title='Winter Sweater' style={{ background:  '#A7746E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E6B4B2', 1)} title='Heather Spangle' style={{ backgroundImage:  `url(${vk_hs})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B5857E', 2)} title='Cashmere Coat' style={{ backgroundImage:  `url(${vk_cc})` }}></button>
                    </div>
                  </div>
                ) : showBerrySmoothieEyeShadow ? ( 
                  //dasique-berry smoothie eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#EABCBB', 2)} title='Slush' style={{ backgroundImage:  `url(${bs_s})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#EDA6AE', 1)} title='Pink Salt' style={{ backgroundImage:  `url(${bs_ps})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6D7E6', 0)} title='Icing' style={{ background: '#F6D7E6' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F8E6EF', 2)} title='Berry Chip' style={{ backgroundImage:  `url(${bs_bc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F6D4DC', 0)} title='Creamy' style={{ background: '#F6D4DC' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F9D8E5', 2)} title='Blush' style={{ backgroundImage:  `url(${bs_b})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F2C6DA', 2)} title='Sweet' style={{ backgroundImage:  `url(${bs_sw})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#EFB2CB', 0)} title='Juicy' style={{ background: '#EFB2CB' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E9AACF', 0)} title='Blueberry' style={{ background:  '#E9AACF' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E8A7CD', 2)} title='Soda' style={{ backgroundImage:  `url(${bs_sd})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E1B5D1', 1)} title='Mauve Beam' style={{ backgroundImage:  `url(${bs_mv})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D29DC0', 1)} title='Frozen' style={{ backgroundImage:  `url(${bs_fr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D3A9B3', 2)} title='Fog' style={{ backgroundImage:  `url(${bs_f})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B48D92', 0)} title='Haze' style={{ background: '#B48D92' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D88FAA', 1)} title='Cherry Cooler' style={{ backgroundImage:  `url(${bs_cc})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E79DD2', 0)} title='Raspberry' style={{ background: '#E79DD2' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#815A55', 1)} title='Fudgy Berry' style={{ backgroundImage:  `url(${bs_fb})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#9F7D7B', 0)} title='Mulberry' style={{ background: '#9F7D7B' }}></button>
                    </div>
                  </div>
                ) : showVintageJeanEyeShadow ? ( 
                  //nyx-ultimate vintage jean eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E2DBC2', 2)} title='01' style={{ backgroundImage: `url(${vj01})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#FCFDF8', 0)} title='02' style={{ background: '#FCFDF8', boxShadow: 'inset 0 0 0 1px #000',}}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B68F7E', 0)} title='03' style={{ background: '#B68F7E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C68080', 0)} title='04' style={{ background: '#C68080' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AA6D70', 2)} title='05' style={{ backgroundImage: `url(${vj05})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AB7455', 0)} title='06' style={{ background: '#AB7455' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#7B4B35', 0)} title='07' style={{ background: '#7B4B35' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#574547', 2)} title='08' style={{ backgroundImage: `url(${vj08})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#596982', 0)} title='09' style={{ background: '#596982'}}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#6A5A56', 1)} title='10' style={{ backgroundImage: `url(${vj10})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#5298BC', 0)} title='11' style={{ background: '#5298BC' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#8B9DC5', 0)} title='12' style={{ background: '#8B9DC5' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A89E9F', 2)} title='13' style={{ backgroundImage: `url(${vj13})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#477085', 2)} title='14' style={{ backgroundImage: `url(${vj14})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#4C3643', 0)} title='15' style={{ background: '#4C3643' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#2B2040', 0)} title='16' style={{ background: '#2B2040' }}></button>
                    </div>
                  </div>
                ) : showAfterglowEyeShadow ? ( 
                  //Nars-afterglow irresistible eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F7E0D1', 2)} title='Adoration' style={{ backgroundImage: `url(${ag_ad})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DC9A73', 2)} title='Amorous' style={{ backgroundImage: `url(${ag_am})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D67F7E', 2)} title='Blaze' style={{ backgroundImage: `url(${ag_bl})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D27D5A', 2)} title='Hot Rod' style={{ backgroundImage: `url(${ag_hr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C3857A', 0)} title='Magnetism' style={{ background: '#C3857A' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#E4989D', 2)} title='High Stakes' style={{ backgroundImage: `url(${ag_hs})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AD544B', 0)} title='Take a Shot' style={{ background: '#AD544B' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C57870', 2)} title='Frisky' style={{ backgroundImage: `url(${ag_fr})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#904931', 0)} title='Mood Swing' style={{ background: '#904931' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AC6C5D', 2)} title='Pure Bliss' style={{ backgroundImage: `url(${ag_pb})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#6C3E34', 0)} title='Midnight' style={{ background: '#6C3E34' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#9E6140', 2)} title='Nitro' style={{ backgroundImage: `url(${ag_ni})` }}></button>
                    </div>
                  </div>
                ) : showIcyNudeEyeShadow ? ( 
                  //Huda beauty-icy nude eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#ECD8E3', 2)} title='Iced Out' style={{ backgroundImage: `url(${in_io})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#CDA29C', 0)} title='Highlight' style={{ background: '#CDA29C' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#BCAEB2', 2)} title='Platinum' style={{ backgroundImage: `url(${in_pl})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#87524E', 0)} title='Unapologetic' style={{ background: '#87524E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#755451', 0)} title='Faux Fur' style={{ background: '#755451' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D59C78', 2)} title='Gold Standard' style={{ backgroundImage: `url(${in_gs})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F0E8E5', 0)} title='Avalanche' style={{ background: '#F0E8E5' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#834E3F', 2)} title='Aurora' style={{ backgroundImage: `url(${in_ar})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AE9486', 1)} title='VVS' style={{ backgroundImage: `url(${in_vvs})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A3897F', 0)} title='Poised' style={{ background: '#A3897F' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#5A4444', 0)} title='She Rich' style={{ background: '#5A4444' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#EAC0A7', 0)} title='Cold Plunge' style={{ background: '#EAC0A7' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F4D1D8', 0)} title='IDC' style={{ background: '#F4D1D8' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#837A70', 2)} title='Bling' style={{ backgroundImage: `url(${in_bl})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C6ADA6', 0)} title='Oneself' style={{ background: '#C6ADA6' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#544A3B', 1)} title='Diamond Dew' style={{ backgroundImage: `url(${in_dd})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C09189', 0)} title='Lavish' style={{ background: '#C09189' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D5A484', 0)} title='First Class' style={{ background: '#D5A484' }}></button>
                    </div>
                  </div>
                ) : showUltimateUtopiaEyeShadow ? ( 
                  //Nyx-ultimate utopia 40 pan eyeshadow palette
                  <div className="product-options-container">
                    <div className="product-options">
                      <button className="back-option" onClick={handleEyeshadowBack}>
                        <i className="fa fa-caret-left" style={{ fontSize: '20px' }}></i></button>
                      <button className="reset-option" onClick={handleReset}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFD3AC', 0)} title='01' style={{ background: '#FFD3AC' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#EF9D83', 2)} title='02' style={{ backgroundImage: `url(${uu02})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#FFD5BD', 0)} title='03' style={{ background: '#FFD5BD' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#F7D1C6', 0)} title='04' style={{ background: '#F7D1C6' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#ED8A84', 0)} title='05' style={{ background: '#ED8A84' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A18E7A', 2)} title='06' style={{ backgroundImage: `url(${uu06})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#CFD4F2', 0)} title='07' style={{ background: '#CFD4F2' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#D2BFB8', 0)} title='08' style={{ background: '#D2BFB8' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B9B888', 2)} title='09' style={{ backgroundImage: `url(${uu09})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#8C896A', 0)} title='10' style={{ background: '#8C896A' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#BDAD8C', 2)} title='11' style={{ backgroundImage: `url(${uu11})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#AF695F', 0)} title='12' style={{ background: '#AF695F' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DFA050', 1)} title='13' style={{ backgroundImage: `url(${uu13})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#855E5F', 0)} title='14' style={{ background: '#855E5F' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A5ACB4', 0)} title='15' style={{ background: '#A5ACB4' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B69888', 2)} title='16' style={{ backgroundImage: `url(${uu16})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DA7C56', 0)} title='17' style={{ background: '#DA7C56' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#885C41', 2)} title='18' style={{ backgroundImage: `url(${uu18})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A55033', 0)} title='19' style={{ background: '#A55033' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#7F6407', 1)} title='20' style={{ backgroundImage: `url(${uu20})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DA855E', 2)} title='21' style={{ backgroundImage: `url(${uu21})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#40110B', 0)} title='22' style={{ background: '#40110B' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#849994', 2)} title='23' style={{ backgroundImage: `url(${uu23})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#1C373E', 0)} title='24' style={{ background: '#1C373E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C3621E', 0)} title='25' style={{ background: '#C3621E' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#A17A44', 1)} title='26' style={{ backgroundImage: `url(${uu26})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#80261B', 0)} title='27' style={{ background: '#80261B' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#DC6859', 0)} title='28' style={{ background: '#DC6859' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#2A2927', 0)} title='29' style={{ background: '#2A2927' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#473B3B', 0)} title='30' style={{ background: '#473B3B' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#524F52', 2)} title='31' style={{ backgroundImage: `url(${uu31})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#382C2C', 0)} title='32' style={{ background: '#382C2C' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#2F232F', 0)} title='33' style={{ background: '#2F232F' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#6C261C', 0)} title='34' style={{ background: '#6C261C' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#7A4C27', 0)} title='35' style={{ background: '#7A4C27' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#3D2312', 2)} title='36' style={{ backgroundImage: `url(${uu36})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#87392D', 2)} title='37' style={{ backgroundImage: `url(${uu37})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#B56858', 2)} title='38' style={{ backgroundImage: `url(${uu38})` }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#C05940', 0)} title='39' style={{ background: '#C05940' }}></button>
                        <button className="makeup-option" onClick={() => handleEyeShadowClick('#575474', 2)} title='40' style={{ backgroundImage: `url(${uu40})` }}></button>
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
          </div>

          <div className="action-buttons">
            <button id="mk-btn">Makeup</button>
            <button id="ac-btn" onClick={() => handleAccessoryBtnClick()}>Accessory</button>
          </div>

        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 V-Glam Closet</p>
      </div>
    </div>
  );
};

export default VirtualTryOn;
