��#   S e a s o n s   L o g i s t i c s   A p p 
 
 
 
 # #   T a b l e   o f   C o n t e n t s 
 
 
 
 -   [ E n d p o i n t s ] ( # e n d p o i n t s ) 
 
 -   [ S e t u p   G u i d e ] ( # s e t u p - g u i d e ) 
 
 -   [ N e e d   t o   r e s e t   y o u r   P o s t g r e S Q L   d a t a b a s e ? ] ( # n e e d - t o - r e s e t - y o u r - p o s t g r e s q l - d a t a b a s e ) 
 
 
 
 # #   E n d p o i n t s 
 
 
 
 # # #   R e a c t / T y p e s c r i p t   w i t h   N e x t . j s :   [ l o c a l h o s t : 3 0 0 0 ] ( h t t p : / / l o c a l h o s t : 3 0 0 0 / ) 
 
 
 
 # # #   F a s t A P I :   [ l o c a l h o s t : 8 0 0 0 ] ( h t t p : / / l o c a l h o s t : 8 0 0 0 / ) 
 
 
 
 # # #   p g A d m i n :   [ l o c a l h o s t : 8 0 8 2 ] ( h t t p : / / l o c a l h o s t : 8 0 8 2 0 / ) 
 
 
 
 # #   S e t u p   G u i d e 
 
 # # #   1 .   G e t   D o c k e r   [ h e r e ] ( h t t p s : / / d o c s . d o c k e r . c o m / g e t - d o c k e r / )   o r   u s i n g   y o u r   t e r m i n a l : 
 
 
 
 -   * * M a c O S * * 
 
 
 
                 b r e w   i n s t a l l   - - c a s k   d o c k e r 
 
 
 
 -     * * W i n d o w s * * 
 
 
 
                 w i n g e t   i n s t a l l   D o c k e r . D o c k e r D e s k t o p 
 
 
 
 # # #   2 .   R u n   t h e   D o c k e r   A p p l i c a t i o n 
 
 
 
 # # #   3 .   C l o n e   t h i s   r e p o s i t o r y   i n t o   a   \ < l o c a l   d i r e c t o r y >   a n d   n a v i g a t e   i n t o   t h e   \ < l o c a l   d i r e c t o r y > . 
 
 ` ` ` 
 
 c d   < p r o j e c t s   f o l d e r > 
 
 m d   < l o c a l   d i r e c t o r y > 
 
 g i t   c l o n e   < g i t   r e p o   l i n k > 
 
 c d   < l o c a l   d i r e c t o r y > 
 
 ` ` ` 
 
 
 
 # # #   4 .   C r e a t e   t h e   n e c e s s a r y   D o c k e r   v o l u m e 
 
 
 
 ` ` ` 
 
 d o c k e r   v o l u m e   c r e a t e   p g _ l o g i s t i c s _ d a t a 
 
 d o c k e r   v o l u m e   c r e a t e   p g - a d m i n _ d a t a 
 
 ` ` ` 
 
 
 
 # # #   5 .   B u i l d   y o u r   D o c k e r   i m a g e s 
 
 
 
 ` ` ` 
 
 d o c k e r   c o m p o s e   - f   d o c k e r - c o m p o s e . d e v . y m l   b u i l d 
 
 ` ` ` 
 
 
 
 # # #   6 .   S p i n   u p   y o u r   D o c k e r   c o n t a i n e r s 
 
 
 
 ` ` ` 
 
 d o c k e r   c o m p o s e   - f   d o c k e r - c o m p o s e . d e v . y m l   u p 
 
 ` ` ` 
 
 
 
 # # #   7 .   T h e   a p p   i s   r e a d y   a n d   a c c e s s i b l e   b y   v i s i t i n g   [ l o c a l h o s t : 3 0 0 0 ] ( h t t p : / / l o c a l h o s t : 3 0 0 0 / ) 
 
 
 
 
 
 # # #   8 .   T h e   A P I   i s   a c c e s s i b l e   a t   [ l o c a l h o s t : 8 0 0 0 ] ( h t t p : / / l o c a l h o s t : 8 0 0 0 / ) 
 
 
 
 # #   N e e d   t o   r e s e t   y o u r   P o s t g r e S Q L   d a t a b a s e ? 
 
 
 
 # # #   1 .   S t o p   a l l   r u n n i n g   D o c k e r   s e r v i c e s / c o n t a i n e r s 
 
 
 
 # # #   2 .   P r u n e   y o u r   D o c k e r   c o n t a i n e r s 
 
 
 
 ` ` ` 
 
 d o c k e r   c o n t a i n e r   p r u n e   - f 
 
 ` ` ` 
 
 
 
 # # #   3 .   D e l e t e   y o u r   e x i s t i n g   v o l u m e s 
 
 
 
 ` ` ` 
 
 d o c k e r   v o l u m e   r m   p g _ l o g i s t i c s _ d a t a : 
 
 d o c k e r   v o l u m e   r m   p g - a d m i n _ d a t a 
 
 ` ` ` 
 
 
 
 # # #   4 .   R e c r e a t e   t h e   n e c e s s a r y   v o l u m e s 
 
 
 
 ` ` ` 
 
 d o c k e r   v o l u m e   c r e a t e   p g _ l o g i s t i c s _ d a t a : 
 
 d o c k e r   v o l u m e   c r e a t e   p g - a d m i n _ d a t a 
 
 ` ` ` 
 
 
 
 # # #   5 .   R e s t a r t   y o u r   D o c k e r   c o n t a i n e r s 
 
 
 
 ` ` ` 
 
 d o c k e r   c o m p o s e   - f   d o c k e r - c o m p o s e . d e v . y m l   u p 
 
 ` ` ` 
 
 
 
 # #   I n s t a l l i n g   P r e - c o m m i t 
 
 # # # #   I n s t r u c t i o n s   f r o m   h t t p s : / / p r e - c o m m i t . c o m / 
 
 
 
 # # #   1 .   I n s t a l l   P r e - c o m m i t 
 
 
 
 -   U s i n g   p i p : 
 
 
 
                 p i p   i n s t a l l   p r e - c o m m i t 
 
 
 
 -   I n   a   p y t h o n   p r o j e c t ,   a d d   t h e   f o l l o w i n g   t o   y o u r   r e q u i r e m e n t s . t x t   ( o r   r e q u i r e m e n t s - d e v . t x t ) : 
 
 
 
                 p r e - c o m m i t 
 
 
 
 -   A s   a   0 - d e p e n d e n c y   z i p a p p : 
 
 
 
     -   l o c a t e   a n d   d o w n l o a d   t h e   . p y z   f i l e   f r o m   t h e   g i t h u b   r e l e a s e s 
 
     -   r u n   p y t h o n   p r e - c o m m i t - # . # . # . p y z   . . .   i n   p l a c e   o f   p r e - c o m m i t   . . . 
 
 
 
 -   U s i n g   h o m e b r e w : 
 
 
 
                 b r e w   i n s t a l l   p r e - c o m m i t 
 
 
 
 -   U s i n g   c o n d a   ( v i a   c o n d a - f o r g e ) : 
 
 
 
                 c o n d a   i n s t a l l   - c   c o n d a - f o r g e   p r e - c o m m i t 
 
 
 
 # # #   2 .   I n s t a l l   t h e   g i t   h o o k   s c r i p t s 
 
 
 
 -   r u n   ` p r e - c o m m i t   i n s t a l l `   t o   s e t   u p   t h e   g i t   h o o k   s c r i p t s 
 
 
 
 # # #   3 .   N o w   p r e - c o m m i t   w i l l   r u n   a u t o m a t i c a l l y   o n   g i t   c o m m i t ! 
 
 
