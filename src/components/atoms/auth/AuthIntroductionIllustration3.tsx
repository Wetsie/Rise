import * as React from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path, Ellipse } from "react-native-svg";
import { scaleSize } from "_styles/mixins";

const AuthIntroductionIllustration3 = (): JSX.Element => {
	const { width } = Dimensions.get("window");
	const height = scaleSize(386);

	return (
		<View
			style={{
				aspectRatio: width / height,
				height,
			}}
		>
			<Svg
				width={width}
				height={height}
				viewBox="0 0 360 386"
				fill="none"
			>
				<Path
					d="M0 305.05V31h360v274.05c-74.7 14.4-48.15 63.9-70.65 77.85-42.3 13.05-60.21-20.16-157.05-9S33.75 325.75 0 305.05z"
					fill="#D89B6A"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M162.996 139.557l.628.264c3.404 1.416 5.979 2.21 7.726 2.383 1.852.184 4.557-.155 8.114-1.016l-.068.891c-.582 7.8-.559 13.689.068 17.665.651 4.126 2.194 7.714 4.628 10.765-2.735 3.087-6.854 6.2-1.772 20.62 3.449 9.788-2.41 44.436-2.924 73.553-.244 13.779 2.607 26.442 4.696 34.418 4.99 19.055 13.073 35.324 21.995 42.742 4.456 3.704 12.067 7.349 9.756 8.233-17.068 6.522-82.731-1.155-83-4.52-.248-3.09 17.425-2.691 19.926-16.71 4.838-27.117-3.587-75.891-3.348-81.883.705-17.697 5.946-39.166 12.504-55.226.244-.598 2.029-.706 4.428-.607l.166-.68c1.534-6.387 1.798-10.76.791-13.12-1.166-2.734-5.14-5.351-11.922-7.853 2.427-1.479 4.229-4.53 5.405-9.154l.122-.495c1.105-4.617 1.799-11.373 2.081-20.27z"
					fill="#fff"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M165.577 236.916c.756-8.999.712-12.461 1.998-21.402.373-2.593-.184-23.908-4.809-20.501-1.733 1.277-1.042 4.123-1.87 6.078-6.868 16.223-11.319 28.203-12.057 46.079-.379 9.181-1.013 18.406-.251 27.565 1.35 16.232 14.662-10.128 16.989-37.819zM176.992 273.396c-1.753-21.188 2.52-42.339 4.744-63.482.715-6.795 1.207-13.764-.484-20.381-.904-3.537-2.43-6.975-2.502-10.627-.072-3.652 1.906-7.738 5.453-8.437-6.936-8.428-8.583-20.945-4.07-30.912l.916 17.272c.162 3.065.401 6.344 2.279 8.756 1.877 2.413 6.034 3.208 7.836.739 1.91-2.618 6.064-2.389 8.693-.513 2.628 1.875 4.189 4.875 5.951 7.595 3.075 4.746 7.005 8.9 11.426 12.394 16.497 13.034 26.044 33.942 27.372 55.064.764 12.147-12.13 39.979-12.192 58.718-.046 13.847 11.837 20.829 15.906 22.69 3.035 1.387 6.336 2.164 9.255 3.787 2.919 1.622 5.532 4.41 5.669 7.774.139 3.403-2.235 6.363-4.739 8.643-9.877 8.996-24.11 12.854-37.115 10.059-4.836-1.039-9.53-2.967-13.466-5.991-5.295-4.067-8.974-9.885-12.237-15.741-9.858-17.689-17.022-37.175-18.695-57.407zM146.557 81.44c1.993-9.852 6.354-19.072 10.678-28.185 2.128-4.485 6.684-7.788 11.7-8.483-1.565 1.088-3.248 2.348-3.636 4.184-.388 1.835 1.545 4.048 3.258 3.199 7.317-3.625 17.035-1.826 22.482 4.162 1.84 2.023 3.194 4.413 4.532 6.78 4.494 7.953 9.134 16.567 8.116 25.594-.302 2.687-.875 5.973 1.338 7.6 1.069.786.742 2.407.285 3.635-4.674 12.54-11.902 24.169-21.138 34.009-3.041 3.24-6.809 6.499-11.31 6.431-2.864-.043-5.495-1.448-7.992-2.815-5.008-2.743-10.074-5.527-14.237-9.387-4.163-3.86-7.396-8.974-7.773-14.566-.284-4.218 1.029-8.634-.501-12.589-.762-1.97-2.187-3.666-2.806-5.684-.619-2.018-.026-4.694 2.026-5.347 3.359-1.069 4.293-5.156 4.978-8.538z"
					fill="#fff"
				/>
				<Ellipse cx={188.73} cy={113.633} rx={4.05} ry={4.051} fill="#DEB030" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M116.199 349.196c1.189-1.085 2.313-2.11 1.799-3.487-3.202.274-5.975 3.107-6.141 6.274-.165 3.167 2.297 6.266 5.454 6.864a247.412 247.412 0 0073.265 2.792c5.873-.654 12.488-1.994 15.558-6.977-.933-1.244-2.841-.396-4.202.464l-.485.311c-4.801 3.024-10.656 3.864-16.371 4.329l-1.07.083c-21.42 1.602-43.039.6-64.213-2.974-2.817-.475-6.445-2.153-5.741-4.885.281-1.091 1.233-1.96 2.147-2.794zm64.512-192.228l-.955-17.844c-4.569 10.008-2.901 22.577 4.12 31.04-3.59.702-5.593 4.805-5.52 8.472.051 2.566.823 5.026 1.595 7.489.331 1.058.663 2.115.938 3.182 1.712 6.644 1.214 13.642.49 20.466l-.098.91c-.552 5.08-1.217 10.16-1.881 15.241-2.074 15.852-4.149 31.713-2.824 47.594 1.694 20.316 8.947 39.883 18.927 57.646 3.304 5.88 7.028 11.722 12.388 15.806 3.986 3.037 8.737 4.973 13.634 6.017 13.166 2.806 27.575-1.068 37.575-10.101 2.534-2.29 4.938-5.262 4.797-8.679-.139-3.379-2.783-6.178-5.739-7.807-1.72-.948-3.571-1.609-5.423-2.27-1.331-.475-2.662-.951-3.947-1.533-9.696-4.396-15.98-15.376-14.873-25.987-5.467 5.721-2.48 15.717 3.422 20.985 3.806 3.396 8.441 5.56 13.088 7.731 2.561 1.196 5.126 2.393 7.558 3.8 1.407.814 2.901 1.884 3.174 3.49.232 1.367-.506 2.702-1.306 3.833-5.687 8.041-15.526 12.157-25.221 13.793-6.358 1.072-13.154 1.192-18.964-1.609-5.032-2.426-8.826-6.793-12.135-11.321l-.428-.592c-16.563-23.01-25.26-51.604-24.323-79.966.304-9.204 1.587-18.367 2.868-27.519 1.832-13.082 3.66-26.141 2.623-39.263l17.543-12.895c1.267-.9 3.261-1.627 4.028-.302 2.514 4.341 6.353 7.634 10.187 10.924 1.33 1.141 2.659 2.282 3.932 3.465 14.205 13.204 21.795 32.695 22.455 52.105.661 19.409-5.203 38.681-14.627 55.649-2.429 4.373-8.615 4.322-13.568 3.691l-.131-.018c-.393-.053-.793-.129-1.105-.369-.677-.52-.636-1.514-.482-2.378l.04-.213c3.041-15.165 5.955-30.549 5.066-45.992-.889-15.443-5.975-31.179-16.921-42.081a187.402 187.402 0 019.216 21.829c2.036 5.823 3.792 11.782 4.531 17.908 1.252 10.381-.443 20.731-2.143 31.11-1.028 6.276-2.058 12.563-2.439 18.875l-.007.136c-.049.917-.027 1.912.578 2.589.53.593 1.366.778 2.144.932l.197.038c5.798 1.122 13.072 1.563 16.121-3.472 11.001-18.166 17.488-39.442 16.143-60.652-1.345-21.209-11.011-42.204-27.712-55.293l-.418-.33c-4.306-3.439-8.134-7.498-11.149-12.115-.313-.478-.619-.965-.926-1.453-1.445-2.299-2.905-4.62-5.1-6.174-2.661-1.883-6.866-2.113-8.8.515l-.088.116c-1.869 2.339-5.975 1.527-7.846-.857-1.798-2.291-2.111-5.362-2.279-8.292zm-25.512 12.539c6.87-8.518 9.3-20.41 6.32-30.928l-2.676 17.221c-.5 3.148-1.145 6.404-3.195 8.827-2.17 2.565-6.488 3.636-8.903 1.298l-.118-.11c-2.656-2.391-6.879-.343-9.816 1.89l-.26.2c-9.298 7.289-18.431 14.97-25.632 24.323-8.022 10.419-13.396 22.579-18.258 34.797l-.896 2.268c-3.061 7.799-5.916 15.841-6.07 24.201-.16 8.695 3.119 17.923 10.344 22.797 3.821 2.578 3.624 8.149 3.004 12.706l-2.437 17.92c-.929 6.9-1.705 14.111.868 20.56 3.323 8.331 11.78 13.758 20.535 15.821 8.404 1.98 17.168 1.345 25.784.594l13.838-1.215c.994-.091 2.027-.228 2.811-.833.777-.6 1.172-1.557 1.486-2.485 3.472-10.269.764-21.269-2.331-31.839l-1.744-5.894c-3.188-10.913-5.742-22.086-6.158-33.441-.591-16.132 3.137-32.06 7.033-47.75l9.614-38.598c.81-3.252-1.11-6.692-3.816-8.682-2.525-1.858-5.618-2.722-8.673-3.485l-.654-.163zm-22.994 5.461c1.719-1.415 4.248-2.796 5.99-1.408a60.384 60.384 0 0024.325 11.64c1.255.281 1.383 1.95 1.174 3.254l-.038.214c-1.684 8.685-4.017 17.294-6.348 25.893-4.737 17.479-9.463 34.918-8.709 52.882.558 13.289 4.115 26.223 7.892 39.008l1.51 5.086c2.232 7.564 4.296 15.694 1.646 23.089-.634 1.771-1.608 3.533-3.231 4.49-1.27.749-2.789.92-4.257 1.075l-8.448.892c-8.273.867-16.708 1.62-24.786-.298-8.409-1.996-16.505-7.475-19.214-15.656-1.965-5.935-.896-12.329.143-18.543l.201-1.208.117-.718a159.3 159.3 0 002.02-22.352 173.15 173.15 0 0124.314 35.433c.475.919 1.868.495 2.749-.05l.678-.419c3.618-2.244 7.251-4.619 9.781-8.021 2.688-3.614 3.878-8.708 1.728-12.664l-13.103-24.113c-4.716-8.692-9.506-18.077-8.41-27.881.701-6.263 3.752-11.969 6.888-17.466l8.054-14.049-.788.851c-7.88 8.548-15.518 18.211-16.717 29.709-.896 8.596 1.967 17.122 5.563 25.008l.35.761c3.875 8.352 8.51 16.324 13.221 24.241l1.77 2.967c1.925 3.226 1.074 7.517-1.081 10.596-2.016 2.879-4.972 4.931-7.924 6.867l-.611.399-5.731-9.78c-5.019-8.553-10.211-17.156-17.451-23.93-1.291-1.208-2.649-2.361-4.006-3.513-3.402-2.888-6.803-5.774-9.146-9.531-6.121-9.813-3.372-22.524.606-33.436l.245-.666c8.267-22.259 20.677-43.532 39.034-58.653zm92.277 135.058l-15.761-3.411c-.898-.187-1.933-.306-2.587.298.146.953 1.181 1.469 2.147 1.807l.222.075c5.115 1.685 10.393 3.393 15.792 3.083.641-.037 1.466-.287 1.459-.904-.007-.558-.705-.825-1.272-.948zm-43.963-116.372l-.256-2.203a41.954 41.954 0 01-9.531.508l-.095-.006c-.936-.057-1.921-.118-2.743.314-.85.447-1.35 1.657-.708 2.363.422.464 1.129.523 1.764.549l.296.013c3.848.158 7.882.229 11.273-1.538zm-40.97-23.05c-.539-1.606 1.409-3.125 3.1-2.954 1.437.145 2.652 1.015 3.84 1.866l.129.092.503.355c3.963 2.744 8.697 4.06 13.41 5.187l1.614.381c2.467.577 2.92 3.779 2.801 6.35l-.016.283c-.015.235-.036.486-.182.672-.294.373-.879.263-1.333.117l-.47-.153c-7.84-2.55-15.715-5.507-22.124-10.669-.523-.422-1.059-.89-1.272-1.527zm28.956-125.566l.299-.213c-4.938.697-9.424 4.011-11.52 8.513-4.258 9.144-8.551 18.398-10.514 28.285-.674 3.393-1.594 7.495-4.901 8.568l-.124.044c-1.921.723-2.468 3.339-1.871 5.322.333 1.108.904 2.119 1.476 3.131.473.838.947 1.677 1.287 2.573.964 2.539.782 5.267.599 8.011-.103 1.546-.207 3.097-.106 4.623.371 5.611 3.554 10.743 7.654 14.617 3.702 3.499 8.129 6.117 12.585 8.619l1.432.801c2.459 1.373 5.05 2.783 7.87 2.826 4.432.068 8.142-3.203 11.136-6.454l.438-.479a102.529 102.529 0 0020.375-33.651c.451-1.232.773-2.859-.28-3.648-1.837-1.376-1.725-3.937-1.466-6.322l.149-1.305c.975-8.82-3.33-17.248-7.642-25.053l-.57-1.027c-1.247-2.246-2.531-4.492-4.242-6.409-5.364-6.009-14.933-7.814-22.137-4.176-1.687.851-3.59-1.369-3.208-3.211.358-1.724 1.831-2.94 3.281-3.985zm-22.051 55.121c.607-3.637 1.217-7.29 1.083-10.927 2.179 6.123 9.523 9.897 15.805 8.123.667-.188 1.319-.43 1.971-.67 1.052-.39 2.103-.78 3.211-.943 1.792-.264 3.893.254 4.751 1.841l.088.157c2.498 4.351 8.98 4.683 13.621 2.639 2.398-1.056 4.554-2.552 6.711-4.05 2.07-1.435 4.139-2.872 6.422-3.92.379 1.337.026 2.72-.296 3.986-.282 1.106-.54 2.122-.268 2.938.172-.236.334-.466.489-.686.995-1.411 1.688-2.394 2.603-1.702 1.058.799.982 3 0 4.13-.348.401-.758.757-1.167 1.111-.744.644-1.482 1.284-1.83 2.183a87.597 87.597 0 01-20.344 30.871c-1.088 1.066-2.249 2.131-3.686 2.646-3.06 1.095-6.359-.559-9.184-2.164l-1.355-.775c-8.16-4.704-16.648-10.389-19.023-19.363-1.334-5.041-.471-10.216.398-15.425zm25.664.63l.313-.214c-.32-1.65-2.966-1.525-4.246-.392-2.199 1.946-2.485 5.624-.519 7.791 1.966 2.167 5.889 2.32 7.947.235.044-.915-1.154-1.402-2.097-1.312a9.224 9.224 0 00-.891.144c-.647.126-1.292.252-1.913.07-1.399-.409-1.868-2.239-1.299-3.541.519-1.189 1.609-2.026 2.705-2.781zm-28.049-9.177l.482-.002c.701.009 1.662.103 1.505.799-.506 2.24-.738 4.853-.86 6.644l-.104 1.641c-.299.115-1.155-1.061-1.648-1.738a23.4 23.4 0 00-.249-.338l-.065-.08c-.13-.283-.306-.619-.499-.987-1.219-2.323-3.116-5.94 1.438-5.94zm7.862-19.587c.387-1.286.826-2.653 1.875-3.497 1.049-.845 2.91-.812 3.499.396 1.38 2.832 4.54 4.332 7.586 5.183 8.997 2.515 19.039 1.057 26.936-3.91 1.537-.968 3.685-.32 4.929.998 1.141 1.21 1.691 2.834 2.104 4.45l.109.44a64.199 64.199 0 011.715 11.593c.034.62.047 1.288-.297 1.806-.208.313-.525.536-.834.75l-.481.334c-1.369.942-2.784 1.849-4.383 2.285-1.787.488-3.879.284-5.225-.983l-.158-.146c-3.41-3.067-8.924-3.546-12.805-1.083-.499.316-.981.679-1.464 1.041-1.236.928-2.471 1.856-3.98 2.012-2.253.232-4.075-1.284-5.889-2.793-.64-.533-1.28-1.065-1.937-1.519-3.634-2.51-8.765-2.66-12.542-.369-2.709-1.948-2.04-6.065-1.083-9.25l2.325-7.738zm40.134 13.582l-11.744-.963c-.671-.051-1.38-.069-1.942.266-.602.358-.831 1.294-.243 1.672.228.147.517.175.793.2l11.912 1.056c1.641.134 3.61.065 4.393-1.265-.81-.741-2.038-.874-3.169-.966zm-26.849.381c.178-.688-.221-1.392-.692-1.933-2.745-3.148-8.611-2.803-10.949.645-.455.671-.456 1.951.367 1.9 2.251-2.854 7.32-2.887 9.609-.062.451.556 1.486.138 1.665-.55zm32.198-2.074c.191-.195.13-.99-.406-1.294-.396-.225-1.517-.334-1.704.052-.422.848 1.524 1.84 2.11 1.242zm-.059-2.87c.2-.493-.751-1.877-1.299-1.88-.481-.001-1.081 1.408-.76 1.872.328.475 1.879.45 2.059.008zm-3.331-.798c.657-.098 1.181-1.543.665-1.923-.514-.38-2.006.018-2.17.491-.168.489.8 1.537 1.505 1.432zm-39.944-1.702c.682.949 2.402.776 2.882-.289s-.529-2.47-1.691-2.354c-1.161.116-1.872 1.694-1.191 2.643zm40.628-2.435c.753.322 1.879.242 1.945-.54-.061-1.047-1.212-1.211-1.964-1.083-.601.103-.59 1.364.019 1.623zm-1.843-.025c.545-.303.402-1.952-.205-2.16-.658-.225-2.428.22-2.326 1.293.102 1.073 1.913 1.21 2.531.867zm-36.557-.586c.656.719 2.064.409 2.358-.52.294-.927-.678-1.992-1.629-1.782-.95.209-1.385 1.583-.729 2.302zm-1.953-2.14c.525-.444.6-1.243.294-1.662-.617-.845-1.134-.84-1.556-.425-.525.519-.55 1.392-.339 2.294.079.338 1.067.246 1.601-.207zm29.668 41.664c-1.638 2.147-4.083 3.685-6.752 4.247l-.213.044c-.551.111-1.117.226-1.543.58-.48.399-.642 1.239-.135 1.606.282.205.666.196 1.016.165 4.551-.409 8.776-3.362 10.663-7.452-.131-.647-1.034-.869-1.642-.588-.533.247-.895.731-1.247 1.202l-.147.196z"
					fill="#00160A"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M196.321 237.788c1.175-.761 2.566.735 2.898 2.128.332 1.393.376 3.07 1.515 3.888 1.166.837 2.732.246 4.125-.03 1.393-.276 3.316.262 3.311 1.73-.001.363-.133.71-.269 1.044a27.781 27.781 0 01-5.028 8.06c.447 1.9 1.13 3.741 2.027 5.462.601 1.151-.745 2.533-2.007 2.473-1.262-.061-2.312-.965-3.335-1.733-1.023-.768-2.302-1.465-3.5-1.05-1.034.358-1.65 1.418-2.327 2.303s-1.735 1.718-2.768 1.357c-1.25-.436-1.425-2.185-1.235-3.537.25-1.771.733-3.506 1.433-5.142.494-1.157-.317-2.498-1.326-3.21-1.01-.712-2.232-1.071-3.187-1.859-.955-.788-1.566-2.301-.835-3.314.355-.492.937-.742 1.501-.933 1.88-.639 3.495-.81 5.466-.641.754-1.859 1.896-3.792 2.649-5.652.207-.509.439-1.051.892-1.344z"
					fill="#DEB030"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M140.821 172.131c-.523-.422-1.059-.89-1.272-1.527-.539-1.606 1.409-3.125 3.1-2.954 1.437.146 2.652 1.015 3.841 1.866.21.151.42.301.631.447 4.416 3.057 9.789 4.343 15.024 5.568 2.558.599 2.951 4.02 2.785 6.633-.015.236-.036.486-.182.672-.294.373-.879.263-1.333.117-7.994-2.586-16.057-5.556-22.594-10.822zm-1.107 137.12c2.688-3.614 3.878-8.708 1.728-12.664l-12.928-23.792c-4.772-8.781-9.694-18.277-8.585-28.202.746-6.671 4.16-12.711 7.502-18.539l7.44-12.976c-8.151 8.757-16.266 18.679-17.505 30.56-.925 8.874 2.156 17.672 5.913 25.769 4.36 9.396 9.68 18.312 14.991 27.208 1.925 3.226 1.074 7.517-1.081 10.596-2.155 3.078-5.384 5.21-8.535 7.266l-5.13-8.754c-5.208-8.888-10.523-17.911-18.052-24.956-1.291-1.208-2.649-2.361-4.006-3.513-3.402-2.888-6.803-5.774-9.146-9.53-6.246-10.015-3.256-23.045.851-34.103 8.267-22.259 20.677-43.532 39.034-58.653 1.719-1.415 4.248-2.796 5.99-1.408a60.384 60.384 0 0024.325 11.64c1.325.297 1.394 2.14 1.136 3.468-1.684 8.685-4.017 17.294-6.348 25.893-4.737 17.479-9.463 34.918-8.709 52.882.609 14.523 4.802 28.621 8.947 42.564l.257.864c2.304 7.751 4.572 16.142 1.844 23.756-.634 1.77-1.608 3.532-3.231 4.489-1.27.749-2.789.92-4.257 1.075l-7.436.786c-8.596.908-17.39 1.804-25.798-.192-8.409-1.996-16.505-7.475-19.214-15.656-1.965-5.934-.896-12.329.143-18.542.107-.645.215-1.287.318-1.927a159.3 159.3 0 002.02-22.352 173.13 173.13 0 0124.314 35.434c.475.918 1.868.494 2.749-.051 3.838-2.37 7.77-4.826 10.459-8.44zM202.493 173.557c.064-.611-.304-1.179-.656-1.692-1.035-1.505-2.12-3.057-3.715-4.005-1.595-.948-3.855-1.113-5.231.112a31.109 31.109 0 01-9.056 5.6c-2.188.881-3.291 3.369-3.2 5.651.091 2.282 1.126 4.418 2.142 6.482.177.359.412.762.818.83.341.056.662-.15.941-.346l17.957-12.632z"
					fill="#fff"
				/>
				<Ellipse cx={155.925} cy={116.063} rx={3.645} ry={4.051} fill="#DEB030" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M146.526 306.644c.486 1.277-1.11 7.208-5.273 11.458-4.163 4.25-9.567 5.259-10.01 4.094-.443-1.164 5.614-3.454 9.437-7.603 3.822-4.15 5.36-9.226 5.846-7.949z"
					fill="#00160A"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M264.383 260.053a1.47 1.47 0 01-.309-1.124 1.51 1.51 0 01.601-1.014s4.153-2.883 4.399-2.775c.245.107-3.516 3.977-3.516 3.977 7.059 8.755 19.769 10.399 28.826 3.727 9.058-6.671 11.246-19.288 4.963-28.615l-27.509 20.791a.752.752 0 01-1.049-.159c-.246-.333 27.662-21.835 27.662-21.835a1.5 1.5 0 012.138.338c6.9 9.986 4.586 23.646-5.218 30.807-9.741 7.241-23.48 5.415-30.988-4.118zm28.715 2.389c-7.726 5.726-18.485 4.98-25.34-1.759a.75.75 0 01-.011-1.063.756.756 0 011.066-.011c6.341 6.195 16.253 6.887 23.397 1.632 7.144-5.254 9.409-14.901 5.345-22.771a.753.753 0 111.34-.688c4.433 8.52 1.972 18.991-5.797 24.66zm-1.508-3.98a3.793 3.793 0 00-.561-2.297 6.46 6.46 0 00-1.842-1.804c-1.341-.865-2.139-.597-2.571-.221-1.41 1.221-.313 4.517.341 5.563.52.849 1.351 1.358 2.239 1.373a2.153 2.153 0 001.425-.543c.562-.493.915-1.248.969-2.071zm-4.289-2.707c.913.301 1.725.912 2.327 1.753.198.298.293.669.268 1.042a1.058 1.058 0 01-.332.724c-.523.334-1.183.133-1.492-.455a5.951 5.951 0 01-.771-3.064zm-4.318 6.928a2.502 2.502 0 01-1.828-.531c-.495-.396-.807-.939-.877-1.525-.117-.924.313-3.428 1.981-3.593.524-.053 1.288.12 2.046 1.22.405.579.676 1.224.795 1.896a2.174 2.174 0 01-.47 1.659c-.379.488-.98.807-1.647.874zm-.539-4.848a6.105 6.105 0 00-.557 2.884c.025.347.15.671.351.908.149.188.356.281.565.255.206-.04.389-.189.504-.412.154-.288.219-.638.183-.984-.13-.998-.495-1.922-1.046-2.651zm-5.011-2.302c-1.723-.697-3.713 1.64-4.183 2.648v-.003c-.673 1.306-.091 2.874 1.303 3.51.319.131.664.198 1.013.198a2.84 2.84 0 001.127-.238 2.93 2.93 0 001.503-1.452c.47-1.006.96-3.966-.763-4.663zm-2.016 5.46a.777.777 0 01-.751-.118c-.455-.507-.463-1.399-.019-2.011.669-1.006 1.558-1.766 2.547-2.18a7.574 7.574 0 01-.913 3.558c-.212.363-.519.631-.864.751zm18.452-18.069a2.348 2.348 0 011.693.448c.497.361.823.934.892 1.569.087 1.328-.854 2.479-2.103 2.576-.11.013-.221.019-.332.018-1.104 0-3.184-.476-3.337-1.906-.161-1.59 2.244-2.592 3.187-2.705zm.323 3.063c.451-.007.815-.395.82-.874a.702.702 0 00-.29-.482.942.942 0 00-.567-.184c-.042 0-.084 0-.128.008a3.463 3.463 0 00-1.874 1.002 3.376 3.376 0 002.041.53h-.002zm1.258 7.26a2.05 2.05 0 00-.038-1.841 2.756 2.756 0 00-1.453-1.292c-1.005-.406-3.964-.818-4.661.656-.698 1.474 1.638 3.193 2.645 3.597.368.15.765.227 1.167.228.288 0 .575-.041.85-.123.667-.188 1.211-.636 1.49-1.225zm-3.903-2.254c.668-.011 1.332.1 1.959.328h-.003c.33.133.598.381.754.696.129.237.14.518.031.764a.885.885 0 01-.59.497 1.49 1.49 0 01-1.031-.068 5.08 5.08 0 01-2.189-2.063 2.776 2.776 0 011.069-.154zM91.888 117.872a2.058 2.058 0 00.432-1.574 2.112 2.112 0 00-.84-1.42s-5.815-4.035-6.16-3.885c-.343.15 4.923 5.568 4.923 5.568-9.883 12.258-27.677 14.558-40.357 5.219-12.68-9.34-15.744-27.004-6.948-40.062l38.512 29.107a1.05 1.05 0 001.47-.222c.343-.467-38.728-30.57-38.728-30.57a2.102 2.102 0 00-2.993.475c-9.66 13.98-6.42 33.103 7.306 43.128 13.636 10.138 32.872 7.582 43.383-5.764zm-40.201 3.344c10.816 8.017 25.879 6.972 35.476-2.462a1.05 1.05 0 00.016-1.488 1.058 1.058 0 00-1.493-.016c-8.877 8.673-22.754 9.641-32.756 2.285-10.002-7.356-13.172-20.862-7.483-31.88a1.05 1.05 0 00-.027-1.073 1.056 1.056 0 00-1.849.11c-6.206 11.929-2.76 26.588 8.116 34.524zm1.785-7.247a4.125 4.125 0 01.64-2.552 7.282 7.282 0 012.105-2.005c1.533-.961 2.445-.663 2.94-.245 1.61 1.357.357 5.019-.391 6.181-.594.943-1.544 1.509-2.56 1.525a2.502 2.502 0 01-1.627-.603c-.642-.548-1.046-1.386-1.108-2.301zm4.518-2.995c-.913.301-1.724.912-2.327 1.753a1.69 1.69 0 00-.268 1.042c.016.284.137.547.333.724.523.334 1.183.133 1.49-.455a5.951 5.951 0 00.772-3.064zm6.42 9.122a3.192 3.192 0 002.436-.759 3.365 3.365 0 001.17-2.179c.156-1.32-.417-4.897-2.642-5.134-.698-.075-1.716.173-2.728 1.744-.54.828-.9 1.748-1.06 2.708-.107.836.116 1.68.627 2.371a3.127 3.127 0 002.196 1.249zm.718-6.015c.55.857.81 1.85.745 2.849-.033.343-.2.662-.469.897a.974.974 0 01-.754.251.989.989 0 01-.675-.406 1.339 1.339 0 01-.245-.972 4.844 4.844 0 011.398-2.619zm7.532-3.529c1.969-.871 4.243 2.05 4.78 3.31v-.003c.77 1.632.104 3.592-1.49 4.387a2.837 2.837 0 01-1.157.248 3.033 3.033 0 01-1.288-.297 3.519 3.519 0 01-1.718-1.816c-.537-1.257-1.097-4.958.873-5.829zm1.703 5.742c.238.12.514.131.76.031a1.22 1.22 0 00.428-1.623 5.056 5.056 0 00-2.056-2.189 5.204 5.204 0 00.173 3.03c.134.329.38.596.695.751zM48.987 92.596a3.284 3.284 0 00-2.37.626 3.132 3.132 0 00-1.25 2.197c-.12 1.859 1.197 3.471 2.946 3.607.154.017.31.026.464.025 1.546 0 4.458-.667 4.672-2.669.226-2.226-3.141-3.629-4.462-3.786zm-.452 4.287c-.631-.01-1.14-.552-1.148-1.223a.983.983 0 01.406-.675c.233-.172.51-.261.794-.257.06 0 .118 0 .179.01a4.842 4.842 0 012.623 1.403 4.72 4.72 0 01-2.857.742h.004zm-1.305 10.091a2.893 2.893 0 01.048-2.454 3.533 3.533 0 011.816-1.723c1.255-.54 4.954-1.09 5.826.875.872 1.965-2.048 4.257-3.306 4.797a3.69 3.69 0 01-1.459.303c-.36 0-.719-.055-1.062-.164a2.971 2.971 0 01-1.864-1.634zm4.663-2.614a5.465 5.465 0 00-1.959.328h.003a1.44 1.44 0 00-.754.697.862.862 0 00-.031.763.886.886 0 00.59.497c.34.101.707.077 1.031-.068a5.067 5.067 0 002.188-2.063 2.774 2.774 0 00-1.068-.154z"
					fill="#FDF5F1"
				/>
				<Path fill="#D89B6A" d="M0 0h360v31H0z" />
			</Svg>
		</View>
	);
};

export default AuthIntroductionIllustration3;
