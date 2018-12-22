(function ($) {
    $.fn.slider = function (options) {
        //默认配置
        var defaultOp = {
            width: '100%',
            height: 32,
            backgroundColor: '#F7DD3A',
            fontColor: '#ffffff',
            content: '滑动并解锁',
            sliderColor: '#E8E8E8',
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
        var config = {
            render: function () {
                div1 = $('<div></div>').css({
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '0px',
                    height: finOp.height + 'px',
                    backgroundColor: finOp.backgroundColor
                });
                div2 = $('<div>' + finOp.content + '</div>').css({
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    textAlign: 'center',
                    'font-weight': 300,
                    'font-family': 'Arial,Verdana,Sans-serif',
                    lineHeight: finOp.height + 'px',
                    color: '#B0ABAB',
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
                    border: '1px solid #CBCBCB',
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
                        .css({cursor:'',backgroundColor:'#5FB760'})
                        .html('<img src="image/ok.png" width="30px" height="30px">')

                    div1.animate({width: $this.width() - finOp.silderWidth}, 150, finOp.success(true))
                    div2.html('验证通过').css({color: '#ffffff'})
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