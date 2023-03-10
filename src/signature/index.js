import React, { useEffect } from "react";
import "./index.css";

function Signature() {
  const signatureRef = React.createRef();
  // 配置内容
  const configInit = {
    width: 400, // 宽度
    height: 200, // 高度
    lineWidth: 5, // 线宽
    strokeStyle: "red", // 线条颜色
    lineCap: "round", // 设置线条两端圆角
    lineJoin: "round", // 线条交汇处圆角
  };

  // 判断是否为移动端
  const mobileStatus = /Mobile|Android|iPhone/i.test(navigator.userAgent);
  // 保存上次绘制的 坐标及偏移量
  const client = {
    offsetX: 0, // 偏移量
    offsetY: 0,
    endX: 0, // 坐标
    endY: 0,
  };
  let canvas = null;
  let ctx = null;

  useEffect(() => {
    // 获取canvas 实例
    canvas = signatureRef.current;
    // 设置宽高
    canvas.width = configInit.width;
    canvas.height = configInit.height;
    // 设置一个边框，方便我们查看及使用
    canvas.style.border = "1px solid #000";
    // 创建上下文
    ctx = canvas.getContext("2d");

    // 设置填充背景色
    ctx.fillStyle = "transparent";
    // 绘制填充矩形
    ctx.fillRect(
      0, // x 轴起始绘制位置
      0, // y 轴起始绘制位置
      configInit.width, // 宽度
      configInit.height // 高度
    );
    // 创建鼠标/手势按下监听器
    window.addEventListener(mobileStatus ? "touchstart" : "mousedown", init);
    // 创建鼠标/手势 弹起/离开 监听器
    window.addEventListener(mobileStatus ? "touchend" : "mouseup", closeDraw);
  }, []);
  // 绘制
  const draw = (event) => {
    console.log(event)

    // 获取当前坐标点位
    const { pageX, pageY } = mobileStatus ? event.changedTouches[0] : event;
    // 修改最后一次绘制的坐标点
    client.endX = pageX;
    client.endY = pageY;
    // setClient({ endX: pageX, endY: pageY });

    // 根据坐标点位移动添加线条
    ctx.lineTo(pageX, pageY);

    // 绘制
    ctx.stroke();
  };
  // 结束绘制
  const closeDraw = () => {
    // 结束绘制
    ctx.closePath();
    // 移除鼠标移动或手势移动监听器
    window.removeEventListener("mousemove", draw);
  };
  // 初始化
  const init = (event) => {
    console.log(event)

    // 获取偏移量及坐标
    const { offsetX, offsetY, pageX, pageY } = mobileStatus
      ? event.changedTouches[0]
      : event;

    // 修改上次的偏移量及坐标
    client.offsetX = offsetX;
    client.offsetY = offsetY;
    client.endX = pageX;
    client.endY = pageY;

    // 清除以上一次 beginPath 之后的所有路径，进行绘制
    ctx.beginPath();

    // 根据配置文件设置进行相应配置
    ctx.lineWidth = configInit.lineWidth;
    ctx.strokeStyle = configInit.strokeStyle;
    ctx.lineCap = configInit.lineCap;
    ctx.lineJoin = configInit.lineJoin;

    // 设置画线起始点位
    ctx.moveTo(client.endX, client.endY);

    // 监听 鼠标移动或手势移动
    window.addEventListener(mobileStatus ? "touchmove" : "mousemove", draw);
  };

  // 取消-清空画布
  const cancel = () => {
    // 清空当前画布上的所有绘制内容
    ctx.clearRect(0, 0, configInit.width, configInit.height);
  };

  // 保存-将画布内容保存为图片
  const save = () => {
    // 将canvas上的内容转成blob流
    canvas.toBlob((blob) => {
      // 获取当前时间并转成字符串，用来当做文件名
      const date = Date.now().toString();
      // 创建一个 a 标签
      const a = document.createElement("a");
      // 设置 a 标签的下载文件名
      a.download = `${date}.png`;
      // 设置 a 标签的跳转路径为 文件流地址
      a.href = URL.createObjectURL(blob);
      // 手动触发 a 标签的点击事件
      a.click();
      // 移除 a 标签
      a.remove();
    });
  };

  return (
    <div className="signature">
      <canvas ref={signatureRef}></canvas>
      <div>
        <button onClick={cancel}>取消</button>
        <button onClick={save}>保存</button>
      </div>
    </div>
  );
}

export default Signature;
