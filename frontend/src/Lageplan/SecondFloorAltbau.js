/*
 *Anwendungs-Bereich:
 *Der Grundriss der 2.Etage ist importiert und wird angezeigt.
 *Eingegebener String von der Suche muss mit der ID eines Rechtecks übereinstimmen.
 *Gesuchter Raum wird dann markiert.
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import secondFloor from './Second_Floor_Altbau.png';
import './Lageplan.css';

class SecondFloorAltbau extends Component {

  constructor(){
    super();

    this.state = {
      selectedRoom: null,
    };
  }

  componentDidMount(){
    if(this.props.search !== ''){
      if(document.getElementById(this.props.search)){
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
        }
        this.setState({
          selectedRoom: document.getElementById(this.props.search),
        });
        document.getElementById(this.props.search).classList.toggle('selected-room');
      } else {
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
          this.setState({
            selectedRoom: null,
          });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.search !== this.props.search){
      if(document.getElementById(nextProps.search)){
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
        }
        this.setState({
          selectedRoom: document.getElementById(nextProps.search),
        });
        document.getElementById(nextProps.search).classList.toggle('selected-room');
      } else {
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
          this.setState({
            selectedRoom: null,
          });
        }
      }
    }
  }

  render() {
    return (
        <div className="svg-wrapper">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1199 767">
                <title>second_floor</title>
                <image href={secondFloor} />
                <rect id="141" data-name="141" className="room" x="394.87" y="566.96" width="84.14" height="61.09"/>
                <polygon id="143" data-name="143" className="room" points="483.05 566.98 521 566.98 521 614 501.99 614 501.99 628.04 483.05 628.04 483.05 566.98"/>
                <rect id="137" data-name="137" className="room" x="237" y="566.99" width="32.98" height="18.99"/>
                <rect id="138" data-name="138" className="room" x="237.02" y="608.01" width="33.01" height="20.02"/>
                <rect id="139" data-name="139" className="room" x="246" y="663.99" width="121.99" height="71.02"/>
                <rect id="140" data-name="140" className="room" x="371.01" y="664.01" width="29.02" height="70.98"/>
                <rect id="142" data-name="142" className="room" x="403.99" y="664.02" width="117.03" height="70.97"/>
                <rect id="144" data-name="144" className="room" x="525" y="663.96" width="19" height="52"/>
                <rect id="145" data-name="145" className="room" x="548" y="649.99" width="23.99" height="66.04"/>
                <rect id="146" data-name="146" className="room" x="576.01" y="650.02" width="108.01" height="65.99"/>
                <rect id="147" data-name="147" className="room" x="686.99" y="650" width="15.01" height="20"/>
                <polygon id="148" data-name="148" className="room" points="687 674 702 674 702 687 724 687 724 650 739 650 739 716 687 716 687 674"/>
                <rect id="155" data-name="155" className="room" x="743" y="650" width="94" height="66"/>
                <rect id="156" data-name="156" className="room" x="841" y="650" width="29" height="66"/>
                <rect id="157" data-name="157" className="room" x="873" y="664" width="29" height="52"/>
                <rect id="159" data-name="159" className="room" x="906" y="664" width="33" height="66"/>
                <rect id="160" data-name="160" className="room" x="943" y="664" width="29" height="66"/>
                <rect id="154" data-name="154" className="room" x="678" y="525" width="20" height="89"/>
                <rect id="153" data-name="153" className="room" x="608" y="488" width="66" height="126"/>
                <rect id="151" data-name="151" className="room" x="701" y="436" width="29" height="48"/>
                <rect id="149" data-name="149" className="room" x="757" y="488" width="66" height="126"/>
                <rect id="158" data-name="158" className="room" x="906" y="567" width="33" height="47"/>
                <rect id="161" data-name="161" className="room" x="943" y="567" width="24" height="61"/>
                <rect id="162" data-name="162" className="room" x="971" y="567" width="61" height="61"/>
                <rect id="164" data-name="164" className="room" x="1115" y="664" width="66" height="66"/>
                <rect id="165" data-name="165" className="room" x="1138" y="632" width="57" height="29"/>
                <rect id="166" data-name="166" className="room" x="1115" y="567" width="80" height="61"/>
                <rect id="167" data-name="167" className="room" x="1115" y="534" width="29" height="29"/>
                <rect id="169" data-name="169" className="room" x="1027" y="436" width="56" height="29"/>
                <rect id="171" data-name="171" className="room" x="1115" y="371" width="61" height="108"/>
                <rect id="170ab" data-name="170a/b" className="room" x="1027" y="297" width="56" height="136"/>
                <rect id="173" data-name="173" className="room" x="1027" y="264" width="56" height="29"/>
                <rect id="172ab" data-name="172a/b" className="room" x="1115" y="227" width="61" height="141"/>
                <rect id="174" data-name="174" className="room" x="1133" y="199" width="43" height="25"/>
                <rect id="175" data-name="175" className="room" x="1115" y="167" width="61" height="29"/>
                <rect id="176" data-name="176" className="room" x="1008" y="144" width="75" height="24"/>
                <rect id="177" data-name="177" className="room" x="1008" y="111" width="75" height="29"/>
                <rect id="178" data-name="178" className="room" x="1115" y="106" width="80" height="57"/>
                <polygon id="168" data-name="168" className="room" points="1115 483 1115 516 1133 516 1133 530 1147 530 1147 563 1176 563 1176 483 1115 483"/>
                <polygon id="179a" data-name="179a" className="room" points="1050 37 1050 89 1115 89 1115 103 1153 103 1153 37 1050 37"/>
                <rect id="179b" data-name="179b" className="room" x="1157" y="69" width="38" height="34"/>
                <polygon id="152" data-name="152" className="room" points="698 484 698 431 697 431 697 430 697 429 696 429 696 428 695 428 695 427 694 427 694 426 693 426 693 424 692 424 692 423 691 423 691 421 690 421 690 420 689 420 689 419 688 419 688 418 686 418 686 417 684 417 684 416 682 416 682 415 680 415 680 414 678 414 678 413 675 413 675 412 673 412 673 411 670 411 670 410 668 410 668 411 666 411 666 412 663 412 663 413 661 413 661 414 658 414 658 415 655 415 655 416 653 416 653 417 651 417 651 418 649 418 649 419 648 419 648 420 648 421 647 421 647 422 646 422 646 424 645 424 645 425 644 425 644 427 643 427 643 428 642 428 642 430 641 430 641 484 698 484"/>
                <polygon id="150" data-name="150" className="room" points="791 484 791 429 790 429 790 428 789 428 789 427 788 427 788 426 787 426 787 425 786 425 786 423 785 423 785 422 784 422 784 421 783 421 783 420 782 420 782 419 781 419 781 418 779 418 779 417 777 417 777 416 775 416 775 415 772 415 772 414 771 414 770 414 770 413 768 413 768 412 765 412 765 411 763 411 763 410 761 410 761 411 759 411 759 412 756 412 756 413 754 413 754 414 751 414 751 415 749 415 749 416 746 416 746 417 744 417 744 418 742 418 742 419 741 419 741 420 740 420 740 422 739 422 739 423 738 423 738 424 737 424 737 425 737 426 736 426 736 427 735 427 735 428 734 428 734 484 791 484"/>
                <polygon id="163" data-name="163" className="room" points="1013 730 1013 744 1014 744 1014 745 1015 745 1015 747 1016 747 1016 748 1017 748 1017 749 1018 749 1018 751 1019 751 1019 752 1020 752 1020 753 1021 753 1021 754 1022 754 1022 755 1023 755 1023 756 1025 756 1025 757 1028 757 1028 758 1030 758 1030 759 1032 759 1032 760 1035 760 1035 761 1037 761 1037 762 1040 762 1040 763 1042 763 1042 762 1045 762 1045 761 1048 761 1048 760 1050 760 1050 759 1053 759 1053 758 1055 758 1055 757 1058 757 1058 756 1060 756 1060 755 1062 755 1062 754 1063 754 1063 752 1064 752 1064 751 1065 751 1065 749 1066 749 1066 747 1067 747 1067 746 1068 746 1068 744 1069 744 1069 730 1111 730 1111 664 975 664 975 730 1013 730"/>
            </svg>
        </div>
    );
  }
}

export default SecondFloorAltbau;
