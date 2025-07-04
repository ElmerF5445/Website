window.onload = function () {
    Data = Data_Import_FromPath("Index_Sequence_GRBRKR.json", "JSON");
}

document.addEventListener("DOMContentLoaded", function () {
    Data = Data_Import_FromPath("GROUNDBREAKER/Index_Sequence_GRBRKR.json", "JSON");
    Sequence_Load();
    Map_Initialize();
})

var Data = {};

function Sequence_Load() {
    Element_Clear("Timeline_Main");
    for (a = 0; a < Data.length; a++) {
        var Arc = Data[a];
        var Arc_InnerHTML = `
            <div class="GRBRKR_Sequence_Arc" id="${Arc.Arc_ID}">
                <h1 class="GRBRKR_Sequence_Arc_Title">
                    ${Arc.Arc_Name}
                </h1>
            </div>
        `;
        if (Arc.Arc_Timeline == "Main") {
            var Arc_Element = document.createElement("span");
            Arc_Element.innerHTML = Arc_InnerHTML;
            document.getElementById("Timeline_Main").appendChild(Arc_Element);
        }
        for (b = 0; b < Arc.Arc_Contents.length; b++) {
            var Chapter = Arc.Arc_Contents[b];
            var Chapter_InnerHTML;
            if (b == Arc.Arc_Contents.length - 1) {
                Chapter_InnerHTML = `
                    <div class="GRBRKR_Sequence_Arc_Item" id="Arc_${Arc.Arc_ID}_Chapter_${b}">
                        <button class="GRBRKR_Sequence_Arc_Item_Button">
                            <h1 class="GRBRKR_Sequence_Arc_Item_Button_Text">
                            ${Chapter.Chapter_Number}
                            </h1>
                        </button>
                    </div>
                `;
            } else {
                Chapter_InnerHTML = `
                    <div class="GRBRKR_Sequence_Arc_Item" id="Arc_${Arc.Arc_ID}_Chapter_${b}">
                        <button class="GRBRKR_Sequence_Arc_Item_Button">
                            <h1 class="GRBRKR_Sequence_Arc_Item_Button_Text">
                            ${Chapter.Chapter_Number}
                            </h1>
                        </button>
                        <div class="GRBRKR_Sequence_Arc_Item_Connector"></div>
                    </div>
                `;
            }

            var Chapter_Element = document.createElement("span");
            Chapter_Element.innerHTML = Chapter_InnerHTML;
            document.getElementById(Arc.Arc_ID).appendChild(Chapter_Element);
        }

    }
}

function Map_Initialize() {
    // Get the single element you want to make draggable and zoomable
    const draggableElement = document.getElementById('GRBRKR_Sequence');

    // Ensure the element exists before trying to add listeners
    if (draggableElement) {
        // --- Current Transform State Variables ---
        let currentTranslateX = 0;
        let currentTranslateY = 0;
        let currentScale = 1;

        // --- Drag State Variables ---
        let isDragging = false;
        let initialPointerX;
        let initialPointerY;

        // --- Pinch Zoom State Variables ---
        let isPinching = false;
        let initialPinchDistance = 0;
        let initialPinchCenterX = 0;
        let initialPinchCenterY = 0;
        let currentPinchScale = 1;

        // --- Configuration ---
        const ZOOM_FACTOR = 0.1;
        const MIN_SCALE = 0.1;
        const MAX_SCALE = 5;
        const ZOOM_TRANSITION_DURATION = '0.15s'; // Adjust for desired smoothness
        const ZOOM_TRANSITION_EASING = 'ease-out';

        // Helper to apply the current transform values to the element
        // `smooth` parameter controls whether to apply a transition
        const applyTransform = (smooth = false) => {
            if (smooth) {
                draggableElement.style.transition = `transform ${ZOOM_TRANSITION_DURATION} ${ZOOM_TRANSITION_EASING}`;
            } else {
                draggableElement.style.transition = 'none';
            }
            draggableElement.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentScale})`;
        };

        // Helper to get the current translation and scale from the element's style
        const getInitialTransformValues = () => {
            const transform = window.getComputedStyle(draggableElement).transform;
            if (transform === 'none' || !transform) {
                currentTranslateX = 0;
                currentTranslateY = 0;
                currentScale = 1;
                return;
            }
            try {
                const matrix = new DOMMatrix(transform);
                currentTranslateX = matrix.m41;
                currentTranslateY = matrix.m42;
                currentScale = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
            } catch (e) {
                console.warn("Could not parse initial transform, defaulting to 0,0,1:", transform, e);
                currentTranslateX = 0;
                currentTranslateY = 0;
                currentScale = 1;
            }
        };

        // Initialize transform values from existing CSS if any
        getInitialTransformValues();
        applyTransform(); // Apply initial transform (no transition)


        // --- Mouse Events (Drag) ---
        draggableElement.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            isDragging = true;
            draggableElement.style.cursor = 'grabbing';
            draggableElement.style.outline = "solid red";

            initialPointerX = event.clientX;
            initialPointerY = event.clientY;

            // Set transition to none immediately when starting a drag
            applyTransform(false); // Make drag snappy

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        const onMouseMove = (event) => {
            if (!isDragging) return;

            const deltaX = event.clientX - initialPointerX;
            const deltaY = event.clientY - initialPointerY;

            currentTranslateX += deltaX;
            currentTranslateY += deltaY;

            initialPointerX = event.clientX;
            initialPointerY = event.clientY;

            applyTransform(false); // Ensure drag remains snappy
        };

        const onMouseUp = () => {
            isDragging = false;
            draggableElement.style.cursor = 'grab';
            draggableElement.style.outline = null;

            // After drag ends, ensure transition is off for future drags
            applyTransform(false);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // --- Mouse Wheel Events (Zoom) ---
        draggableElement.addEventListener('wheel', (event) => {
            event.preventDefault();

            const scaleAmount = event.deltaY * -0.01 * ZOOM_FACTOR;
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentScale + scaleAmount));

            // Only apply zoom-to-point if scale actually changes
            if (newScale !== currentScale) {
                const rect = draggableElement.getBoundingClientRect();
                const mouseXRelativeToElement = event.clientX - rect.left;
                const mouseYRelativeToElement = event.clientY - rect.top;

                currentTranslateX -= mouseXRelativeToElement * (newScale / currentScale - 1);
                currentTranslateY -= mouseYRelativeToElement * (newScale / currentScale - 1);

                currentScale = newScale;
                applyTransform(true); // Apply smooth transition for zoom
            }
        });


        // --- Touch Events (Pinch Zoom & Drag) ---
        draggableElement.addEventListener('touchstart', (event) => {
            event.preventDefault();

            if (event.touches.length === 2) {
                isPinching = true;
                initialPinchDistance = getDistance(event.touches[0], event.touches[1]);
                initialPinchCenterX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
                initialPinchCenterY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

                currentPinchScale = currentScale;

                // Set transition to none when starting a pinch to avoid initial jump before smooth scale
                applyTransform(false);
            } else if (event.touches.length === 1) {
                isDragging = true;
                draggableElement.style.cursor = 'grabbing';
                draggableElement.style.outline = "solid red";

                initialPointerX = event.touches[0].clientX;
                initialPointerY = event.touches[0].clientY;

                // Set transition to none immediately when starting a drag
                applyTransform(false);
            }

            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
            document.addEventListener('touchcancel', onTouchEnd);
        }, { passive: false });


        const onTouchMove = (event) => {
            event.preventDefault();

            if (isPinching && event.touches.length === 2) {
                const currentPinchDistance = getDistance(event.touches[0], event.touches[1]);
                const scaleFactor = currentPinchDistance / initialPinchDistance;

                const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentPinchScale * scaleFactor));

                // Only apply zoom-to-point if scale actually changes
                if (newScale !== currentScale) {
                    const currentPinchCenterX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
                    const currentPinchCenterY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

                    const rect = draggableElement.getBoundingClientRect();
                    const pinchXRelativeToElement = currentPinchCenterX - rect.left;
                    const pinchYRelativeToElement = currentPinchCenterY - rect.top;

                    currentTranslateX -= pinchXRelativeToElement * (newScale / currentScale - 1);
                    currentTranslateY -= pinchYRelativeToElement * (newScale / currentScale - 1);

                    currentScale = newScale;
                    applyTransform(true); // Apply smooth transition for pinch zoom
                }

                // Update initial pinch center for the next move (smoother continuous pinch)
                initialPinchCenterX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
                initialPinchCenterY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
                // Also update initialPinchDistance to base next calculation on current position, for smoother scaling
                initialPinchDistance = currentPinchDistance;
                currentPinchScale = currentScale; // Update the base scale as well

            } else if (isDragging && event.touches.length === 1) {
                const deltaX = event.touches[0].clientX - initialPointerX;
                const deltaY = event.touches[0].clientY - initialPointerY;

                currentTranslateX += deltaX;
                currentTranslateY += deltaY;

                initialPointerX = event.touches[0].clientX;
                initialPointerY = event.touches[0].clientY;

                applyTransform(false); // Ensure drag remains snappy
            }
        };

        const onTouchEnd = (event) => {
            // If all fingers are lifted, stop both dragging and pinching
            if (event.touches.length === 0) {
                isDragging = false;
                isPinching = false;
                draggableElement.style.outline = null;
                draggableElement.style.cursor = 'grab';

                // Ensure transition is off after any operation for future drags
                applyTransform(false);

                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
                document.removeEventListener('touchcancel', onTouchEnd);
            }
        };

        function getDistance(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

    } else {
        console.warn("Element with ID 'GRBRKR_Sequence' not found.");
    }
}
