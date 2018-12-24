/**
 *滑块插件
 * width ：input的宽度
 * height ：input的高度
 * backgroundColor：滑动过后的背景颜色
 * sliderColor ：滑块的颜色
 * content ：提示文字
 * fontColor ：提示文字颜色
 * silderWidth：滑块的宽度
 * iconColor滑块内部字体颜色
 * success 验证成功的回掉函数
 * by wzd wzdxx1314@163.com
 * **/

(function ($) {
    $.fn.slider = function (options) {
        //默认配置
        var defaultOp = {
            width: '100%',
            height: 32,
            backgroundColor: '#D1E9FD',
            secondBackgroundColor:'#F7F9FA',
            fontColor: '#ffffff',
            content: '向左拖拽互动校验',
            successContent:'验证成功',
            sliderColor: '#2693F7',
            silderWidth: 40,
            iconColor: '#ffffff',
            success: function (value) {
                console.log(value)
            }
        }
        var div1, div2, div3;
        var start = 0, end = 0, distance = 0;
        var finOp = $.extend(defaultOp, options);
        var $this = $(this)
        //初始化清空子节点
        $this.empty();
        var config = {
            render: function () {
                div1 = $('<div></div>').css({
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '0px',
                    height: finOp.height-2 + 'px',
                    backgroundColor: finOp.backgroundColor,
                    border:'1px solid #2693F7',
                });
                div2 = $('<div>' + finOp.content + '</div>').css({
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    textAlign: 'center',
                    'font-weight': 300,
                    'font-family': 'Arial,Verdana,Sans-serif',
                    lineHeight: finOp.height + 'px',
                    // backgroundColor:finOp.secondBackgroundColor,
                    color: '#1A1A1A',
                    top: '0px',
                    left: '0px',
                });
                div3 = $('<div>&gt;&gt;</div>').css({
                    position: 'absolute',
                    backgroundColor: finOp.sliderColor,
                    width: finOp.silderWidth,
                    height: '100%',
                    cursor: 'move',
                    textAlign: 'center',
                    lineHeight: finOp.height + 'px',
                    color: finOp.iconColor
                });
                $this.css({
                    position: 'relative',
                    width: finOp.width + 'px',
                    height: finOp.height + 'px',
                    // border: '1px solid #CBCBCB',
                    'box-shadow': '0px 0px 5px #888888',
                    'user-select': 'none'
                }).append(div1).append(div2).append(div3)


            },
            bind: function () {
                var _this = this;
                div3.on('mousedown', function (event) {
                    start = event.pageX;
                    end = event.pageX;
                    distance = 0;
                    $this.on('mousemove', _this.mousemoveFn)
                    $('body').on('mouseup', _this.mouseupFn)
                })
            },
            mousemoveFn: function (event) {
                end = event.pageX;
                distance = end - start;
                var max = $this.width() - finOp.silderWidth
                if (distance > max) {
                    distance = max
                }
                if (distance < 0) {
                    distance = 0
                }
                div1.css('width', distance + 'px')
                div3.css('left', distance + 'px')
            },
            mouseupFn: function () {
                var _this = this;
                if (distance >= ($this.width() - finOp.silderWidth - 20)) {
                    div3.animate({left: $this.width() - finOp.silderWidth}, 150)
                        .unbind()
                        .css({cursor:''})
                        .html('<img src="image/ok.png" width="30px" height="30px">')

                    div1.animate({width: $this.width() - finOp.silderWidth}, 150, finOp.success(true))
                    div2.html(finOp.successContent)
                } else {
                    div1.animate({width: 0}, 200)
                    div3.animate({left: 0}, 150)
                }
                $this.unbind('mousemove', _this.mousemoveFn)
                $('body').unbind('mouseup', _this.mouseupFn)
            }
        }

        config.render()
        config.bind()
    }
})($)