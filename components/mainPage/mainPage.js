import React, { useState, useEffect } from 'react';
import styles from './mainPage.module.scss';
import ToolsSection from './sections/toolsSection/toolsSection';
import AboutSection from './sections/aboutSection/aboutSection';
import ContactSection from './sections/contactSection/contactSection';
import ExperienceSection from './sections/experienceSection/experienceSection';
import ProjectsSection from './sections/projectsSection/projectsSection';
import StatisticSection from './sections/statisticSection/statisticSection';
import LandingSection from './sections/landingSection/landingSection';
import DotNavigation from '../dotNavigation/dotNavigation';
import Menu from '../menu/menu';

import { addListeners, removeListeners} from '../../utils/utils';

export default function mainPage() {
  const sectionCount = 7;
  const scrollAnimationDuration = 200;

  const [currentSection, setCurrentSection] = useState(null);
  const [previousSection, setPreviousSection] = useState(null);
  const [direction, setDirection] = useState("down");

  function handleScroll(event) {
    removeListeners(handleScroll);
    setTimeout(() => addListeners(handleScroll), scrollAnimationDuration);

    if (event.deltaY < 0 || event.keyCode == 38) {
      handleChangeSection('up');
    }

    if (event.deltaY > 0 || event.keyCode == 40) {
      handleChangeSection('down');
    }
  }

  useEffect(()=> {
    return () => removeListeners(handleScroll);
  },[]);

  function handleChangeSection(direction) {
    setDirection(direction);    
    setCurrentSection((section) => {
      const currentSection = section || 0; //first time is null
      
      const newCurrentSection = direction === "down" ?
        Math.min(currentSection + 1, sectionCount - 1) : 
        Math.max(currentSection - 1, 0);

      if (newCurrentSection !== currentSection) {
        setPreviousSection(currentSection);
      }

      return newCurrentSection;
    });
  }

  function handleMenuClick(newCurrentSection) {
    if (newCurrentSection === currentSection) {
      return;
    }

    setDirection(newCurrentSection > currentSection ? 'down' : 'up');
    setPreviousSection(currentSection);
    setCurrentSection(newCurrentSection);
  }

  //handleColorChange
  // useEffect(() => {

  // }, [currentSection]);

  //handle menu and dots display
  useEffect(() => {
    if (currentSection === 1 && previousSection === 0){
      console.log('display');
    } else if (currentSection === 0 && previousSection === 1) {
      console.log('hide');
    }
  }, [currentSection, previousSection]);

  const sectionMap = {
    0: {
      component: LandingSection,
      defaultProps: {
        handleScroll: () => handleScroll({ keyCode: 40}),
        activateScroll: () => addListeners(handleScroll),
      },
      index: 0,
    },
    1: {
      component: AboutSection,
      index: 1,
    },
    2: {
      component: ToolsSection,
      index: 2,
    },
    3: {
      component: ExperienceSection,
      index: 3,
    },
    4: {
      component: StatisticSection,
      index: 4,
    },
    5: {
      component: ProjectsSection,
      index: 5,
    },
    6: {
      component: ContactSection,
      index: 6,
    },
  }

  const menuItemList = [
    {
      name: 'Home',
      handleClick: () => handleMenuClick(0),
    },
    {
      name: 'About',
      handleClick: () => handleMenuClick(1),
    },
    {
      name: 'Tools',
      handleClick: () => handleMenuClick(2),
    },
    {
      name: 'Experience',
      handleClick: () => handleMenuClick(3),
    },
    {
      name: 'Contact',
      handleClick: () => handleMenuClick(6),
    },
  ];

  return (
    <div 
      className={styles.container}
      id="content"
    >
      <Menu 
        itemList={menuItemList}
        className={(currentSection !== null && 'fadeIn') || ''}
      />
      <DotNavigation 
        count={sectionCount}
        currentItem={currentSection}
        previousItem={previousSection}
        handleSelectItem={handleMenuClick}
        className={(currentSection !== null && 'fadeIn') || ''}
      />
      {
        Array.from({length: sectionCount}).map((_, index) => {
          const section = sectionMap[`${index}`];
          let containerClass = '';
          const isFocused = index === currentSection;

          if (isFocused) {
            containerClass = direction === 'down' ? 'animationInUp' : 'animationInDown';
          } else if (index === previousSection) {
            containerClass = direction === 'down' ? 'animationOutUp' : 'animationOutDown';
          } else if (index === 0 && currentSection === null) {
            containerClass = 'display';
          }

          return React.createElement(
            section.component,
            {
              ...section.defaultProps,
              key: index,
              containerClass,
              isFocused,
            }
          )
        })
      }
    </div>
  )
}