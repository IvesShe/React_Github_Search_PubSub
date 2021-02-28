import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
export default class Search extends Component {

    search = ()=>{
        
        // 獲取用戶的輸入
        //console.log(this.keyWordElement.value);

        // 連續解構賦值+重命名
        const {keyWordElement:{value:keyWord}} = this;
        console.log(keyWord);

        // 不能為空
        if(keyWord.trim() === ''){
            alert('輸入不能為空');
            return;
        }

        // 發送請求前通知List更新狀態
        //this.props.updateAppState({isFirst:false,isLoading:true});
        console.log('Search組件發佈消息了');
        PubSub.publish('update',{isFirst:false,isLoading:true});
        
        // 發送網絡請求
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                // 請求成功後通知List更新狀態
                //this.props.updateAppState({isLoading:false,users:response.data.items});
                console.log('Search組件發佈消息了');
                PubSub.publish('update',{isLoading:false,users:response.data.items});
                console.log('成功了',response.data);
            },
            error => {
                // 請求失敗後通知App更新狀態
                //this.props.updateAppState({isLoading:false,err:error})
                console.log('Search組件發佈消息了');
                PubSub.publish('update',{isLoading:false,err:error});
                console.log('失敗了',error);
            }
        )
    }

    // 鍵盤事件的回調
    // 可以點擊搜尋按鍵 或 直接按下Enter
    handleKeyUp = (event)=>{
        const {keyCode,target} = event;

        // 判斷是否為Enter按鍵
        if(keyCode !== 13) return;

        // 不能為空
        if(target.value.trim() === ''){
            alert('輸入不能為空');
            return;
        }

        // 打印所按的值、按鍵的值
        console.log(target.value, keyCode);

        this.search();
    }

    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">搜尋Github用戶</h3>
                    <div>
                        <input onKeyUp={this.handleKeyUp} ref={c => this.keyWordElement = c} type="text" placeholder="輸入關鍵詞點擊搜尋" />&nbsp;
                        <button onClick={this.search}>搜尋</button>
                    </div>
                </section>
            </div>
        )
    }
}
