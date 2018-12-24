/**
 * 封装的input的jquery插件
 * 暂时提供的样式就一种
 * 可传递参数3个 ，
 * width input的宽度
 * placeholder 未输入时的提示文字
 * alarmPlaceholder 焦点失去后如果为空的提示符
 * 算是第一版本
 * 引入时 ，同时引入hl-input.css的样式表
 * by wzd wzdxx1314@163.com
 * */


(function ($) {
    $.fn.inputInit = function (options) {
        var defaultOp = {
            width: '100%',//input宽度
            placeholder: '',//未输入时的提示文字
            alarmPlaceholder: '',//焦点失去后如果为空的提示符
        }
        var finOp = $.extend(defaultOp, options)
        var $this = $(this);
        // $this.addClass('hl-input')
        $this.on('focus', function () {
            $this.removeClass('input-alarm').removeClass('input-active-alarm').attr('placeholder', finOp.placeholder)
            $this.addClass('input-active')
        }).on('blur', function () {
            $this.removeClass('input-active')
            if ($this.val() == '') {
                $this.addClass('input-alarm').addClass('input-active-alarm').attr('placeholder', finOp.alarmPlaceholder)
            } else {
                $this.removeClass('input-alarm').removeClass('input-active-alarm').attr('placeholder', finOp.placeholder)
            }
        })
    }
})($)